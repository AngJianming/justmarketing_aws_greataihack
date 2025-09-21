"""
Direct MP4 to Text Pipeline - No MediaConvert needed
Uses Amazon Transcribe's native MP4 support
"""
import boto3
import json
import time
import os
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class MP4ToTextPipeline:
    def __init__(self):
        self.region = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
        self.bucket = os.getenv('S3_BUCKET_NAME', 'video-bucket-ken')
        
        self.s3 = boto3.client('s3')
        self.transcribe = boto3.client('transcribe')
        self.bedrock_agent = boto3.client("bedrock-agent-runtime")
    
    def process_text_with_bedrock(self, transcript_text, filename="video_file"):
        """
        Process the transcribed text with AWS Bedrock flow
        Returns: dict with success status and results
        """
        try:
            # Flow + Alias IDs
            flow_id = "CJB0RNM9XM"
            flow_alias = "I4LBMMG8G8"

            # Build input document
            input_document = {
                "content": transcript_text,
                "country": "Malaysia",
                "file_type": "video"
            }

            # Invoke the flow
            response = self.bedrock_agent.invoke_flow(
                flowIdentifier=flow_id,
                flowAliasIdentifier=flow_alias,
                enableTrace=True,
                inputs=[
                    {
                        "content": {
                            "document": input_document
                        },
                        "nodeName": "FlowInputNode",      
                        "nodeOutputName": "document" 
                    }
                ]
            )

            # Process the response stream
            bedrock_results = []
            flow_outputs = []

            for event in response["responseStream"]:
                # Each event is a dict with exactly one key
                for event_type, event_value in event.items():
                    if event_type == "flowOutputEvent":
                        flow_outputs.append(event_value)
                    elif event_type == "traceEvent":
                        # Store trace events for detailed analysis
                        bedrock_results.append({
                            "type": "trace",
                            "data": event_value
                        })
                    elif event_type == "flowCompletionEvent":
                        bedrock_results.append({
                            "type": "completion",
                            "data": event_value
                        })
                    elif event_type == "exception":
                        return {
                            "success": False,
                            "error": f"Bedrock flow exception: {event_value}",
                            "flow_outputs": flow_outputs,
                            "bedrock_results": bedrock_results
                        }

            return {
                "success": True,
                "flow_outputs": flow_outputs,
                "bedrock_results": bedrock_results,
                "input_document": input_document
            }

        except Exception as e:
            return {
                "success": False,
                "error": f"Bedrock processing error: {str(e)}",
                "flow_outputs": [],
                "bedrock_results": []
            }
    
    def upload_video(self, video_file):
        """Upload MP4 to S3"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        s3_key = f"videos/{timestamp}_{os.path.basename(video_file)}"
        
        self.s3.upload_file(video_file, self.bucket, s3_key)
        return s3_key, timestamp
    
    def start_transcription(self, video_s3_key, language_code=None):
        """Start transcription of MP4 file with automatic language detection"""
        base_name = os.path.splitext(os.path.basename(video_s3_key))[0]
        
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        job_name = f"transcribe_{base_name}_{timestamp}"
        
        job_params = {
            'TranscriptionJobName': job_name,
            'MediaFormat': 'mp4',
            'Media': {
                'MediaFileUri': f"s3://{self.bucket}/{video_s3_key}"
            },
            'OutputBucketName': self.bucket,
            'OutputKey': f"transcripts/{base_name}_transcript.json"
        }
        
        # Use automatic language detection or specified language
        if language_code:
            job_params['LanguageCode'] = language_code
        else:
            # Enable automatic language identification
            job_params['IdentifyLanguage'] = True
            # Optionally specify candidate languages to improve accuracy
            job_params['LanguageOptions'] = [
                'en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR', 
                'ja-JP', 'ko-KR', 'zh-CN', 'ar-SA', 'hi-IN', 'ru-RU',
                'ms-MY', 'th-TH', 'vi-VN', 'id-ID', 'tl-PH'
            ]
        
        self.transcribe.start_transcription_job(**job_params)
        return job_name
    
    def wait_for_transcription(self, job_name):
        """Wait for transcription to complete"""
        while True:
            response = self.transcribe.get_transcription_job(TranscriptionJobName=job_name)
            job = response['TranscriptionJob']
            status = job['TranscriptionJobStatus']
            
            if status == 'COMPLETED':
                return job
            elif status == 'FAILED':
                return None
            else:
                time.sleep(10)
    
    def save_transcript_text(self, transcription_job, video_timestamp):
        """Get transcript JSON from S3 and extract text using video timestamp"""
        try:
            job_name = transcription_job['TranscriptionJobName']
            
            # Extract clean video name from job name
            # e.g., "transcribe_20250921_103607_test_video_20250921_123456" -> "test_video"
            job_parts = job_name.replace('transcribe_', '').split('_')
            if len(job_parts) >= 5:
                # Skip first 2 (date/time) and last 2 (date/time), keep the middle part(s)
                clean_video_name = '_'.join(job_parts[2:-2])
            else:
                clean_video_name = 'video'  # fallback
            
            # Use the video timestamp to construct the JSON filename
            json_s3_key = f"transcripts/{video_timestamp}_{clean_video_name}_transcript.json"
            
            try:
                response = self.s3.get_object(Bucket=self.bucket, Key=json_s3_key)
            except Exception as e:
                # List all transcript files to see what's available
                list_response = self.s3.list_objects_v2(
                    Bucket=self.bucket,
                    Prefix="transcripts/"
                )
                
                if 'Contents' in list_response:
                    # Find all files that contain our video name and sort by timestamp
                    matching_files = []
                    for obj in list_response['Contents']:
                        if clean_video_name in obj['Key'] and obj['Key'].endswith('.json'):
                            matching_files.append(obj['Key'])
                    
                    if matching_files:
                        # Sort by filename (timestamp) - newest first
                        matching_files.sort(reverse=True)
                        newest_file = matching_files[0]
                        json_s3_key = newest_file
                        response = self.s3.get_object(Bucket=self.bucket, Key=json_s3_key)
                    else:
                        return None, ""
                else:
                    return None, ""
            
            transcript_data = json.loads(response['Body'].read().decode('utf-8'))
            
            text = transcript_data['results']['transcripts'][0]['transcript']
            
            # Check for language identification results
            language_info = ""
            if 'results' in transcript_data and 'language_identification' in transcript_data['results']:
                lang_results = transcript_data['results']['language_identification']
                if lang_results:
                    detected_lang = lang_results[0]['code']  # Note: it's 'code' not 'language_code'
                    confidence = lang_results[0]['score']
                    language_info = f"🌍 Detected Language: {detected_lang} (confidence: {float(confidence):.2f})"
            
            if not text.strip():
                text = "[No speech detected in the audio]"
            
            return text, language_info
            
        except Exception as e:
            return None, ""
    
    def process_video(self, video_file, language_code=None):
        """
        MP4 TO TEXT FLOW:
        1. Upload to S3
        2. MP4 directly to transcript (with automatic language detection)
        3. Return JSON file
        4. Use boto S3 to get JSON result
        5. Extract result and show text
        """
        try:
            # Step 1: Upload to S3
            video_s3_key, video_timestamp = self.upload_video(video_file)
            
            # Step 2: MP4 directly to transcript
            job_name = self.start_transcription(video_s3_key, language_code)
            
            # Step 3: Return JSON file (wait for completion)
            transcription_result = self.wait_for_transcription(job_name)
            
            if not transcription_result:
                return None
            
            # Steps 4 & 5: Get JSON and extract text
            result = self.save_transcript_text(transcription_result, video_timestamp)
            
            if not result or not result[0]:
                return None
            
            text, language_info = result
            
            # Create logs instead of printing
            logs = [
                f"📁 Video: s3://{self.bucket}/{video_s3_key}",
                f"📋 Timestamp: {video_timestamp}",
                f"📝 Text: {text}"
            ]
            
            if language_info:
                logs.insert(2, language_info)
            
            return text
            
        except Exception as e:
            return None

    def process_video_detailed(self, video_file, language_code=None):
        """
        Enhanced version that returns detailed results for API usage
        Returns tuple: (text, language_info, success)
        """
        try:
            # Step 1: Upload to S3
            video_s3_key, video_timestamp = self.upload_video(video_file)
            
            # Step 2: MP4 directly to transcript
            job_name = self.start_transcription(video_s3_key, language_code)
            
            # Step 3: Return JSON file (wait for completion)
            transcription_result = self.wait_for_transcription(job_name)
            
            if not transcription_result:
                return None, None, False
            
            # Steps 4 & 5: Get JSON and extract text
            result = self.save_transcript_text(transcription_result, video_timestamp)
            
            if not result or not result[0]:
                return None, None, False
            
            text, language_info = result
            
            return text, language_info, True
            
        except Exception as e:
            # Return error info instead of printing
            return None, None, False

    def process_video_with_bedrock(self, video_file, language_code=None):
        """
        Complete pipeline: Video -> Transcription -> Bedrock Analysis
        Returns tuple: (text, language_info, bedrock_result, success)
        """
        try:
            # Step 1: Get transcription
            text, language_info, transcription_success = self.process_video_detailed(video_file, language_code)
            
            if not transcription_success or not text:
                return None, None, None, False
            
            # Step 2: Process with Bedrock
            bedrock_result = self.process_text_with_bedrock(text, os.path.basename(video_file))
            
            return text, language_info, bedrock_result, True
            
        except Exception as e:
            # Return error info instead of printing
            return None, None, None, False

def main():
    """
    Main function for testing - kept minimal for backward compatibility
    """
    pipeline = MP4ToTextPipeline()
    
    # Find MP4 files
    mp4_files = "test_video_2.mp4"
    
    if mp4_files:
        video_file = mp4_files
        
        result = pipeline.process_video(video_file)
        # Return result instead of printing
        return {"success": bool(result), "result": result}
    else:
        return {"success": False, "error": "No MP4 files found"}

if __name__ == "__main__":
    main()