"""
FastAPI Application for Video Speech-to-Text Processing
Accepts base64-encoded video files and returns transcribed text
"""
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
import tempfile
import os
from datetime import datetime
from speech_to_text import MP4ToTextPipeline
from text_checker import process_text_content  
from image_checker import process_base64_image_and_get_analysis
import uvicorn

# Create FastAPI instance
app = FastAPI(
    title="Video Speech-to-Text API",
    description="API for converting video files to text using AWS Transcribe",
    version="1.0.0"
)

# Add CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class SpeechToTextRequest(BaseModel):
    video_base64: str
    language_code: str = None  # Optional language code (e.g., 'en-US', 'es-ES')
    filename: str = "video.mp4"  # Optional filename
    use_bedrock: bool = False  # Whether to process with Bedrock flow

class TextAnalysisRequest(BaseModel):
    text_content: str
    country: str = "Malaysia"  # Country context for analysis

class ImageAnalysisRequest(BaseModel):
    image_base64: str
    image_format: str  # jpeg, png, webp, gif
    country: str = "Malaysia"  # Country context for analysis

class BedrockResult(BaseModel):
    success: bool
    flow_outputs: list = []
    bedrock_results: list = []
    error: str = None
    input_document: dict = None

class SpeechToTextResponse(BaseModel):
    success: bool
    text: str = None
    language_info: str = None
    bedrock_analysis: dict = None  # Bedrock analysis result
    error: str = None
    processing_time: float = None

class TextAnalysisResponse(BaseModel):
    success: bool
    analysis_result: dict = None
    error: str = None
    processing_time: float = None

class ImageAnalysisResponse(BaseModel):
    success: bool
    analysis_result: dict = None
    image_description: str = None
    error: str = None
    processing_time: float = None

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Video Speech-to-Text API", 
        "version": "1.0.0",
        "endpoints": [
            "/testing", 
            "/speech-to-text", 
            "/text-analysis", 
            "/image-analysis",
            "/health"
        ]
    }

@app.get("/testing")
async def testing():
    """Test endpoint to verify API connectivity"""
    return {
        "status": "success",
        "message": "API is working correctly!",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0"
    }

@app.post("/speech-to-text", response_model=SpeechToTextResponse)
async def speech_to_text(request: SpeechToTextRequest):
    """
    Convert base64-encoded video to text using AWS Transcribe
    Optionally process with AWS Bedrock flow for analysis
    
    Parameters:
    - video_base64: Base64-encoded video file (MP4 format)
    - language_code: Optional language code (if not provided, auto-detection will be used)
    - filename: Optional filename for the video
    - use_bedrock: Whether to process the transcript with Bedrock flow (default: False)
    """
    start_time = datetime.now()
    
    try:
        pipeline = MP4ToTextPipeline()
        temp_file_path = None
        try:
            video_data = request.video_base64
            if video_data.startswith('data:'):
                video_data = video_data.split(',')[1]
            decoded_video = base64.b64decode(video_data)
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4', prefix='video_') as temp_file:
                temp_file.write(decoded_video)
                temp_file_path = temp_file.name
            if request.use_bedrock:
                text, language_info, bedrock_result, success = pipeline.process_video_with_bedrock(
                    temp_file_path,
                    request.language_code
                )
            else:
                text, language_info, success = pipeline.process_video_detailed(
                    temp_file_path,
                    request.language_code
                )
                bedrock_result = None
        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                try:
                    os.unlink(temp_file_path)
                except Exception:
                    pass
        
        processing_time = (datetime.now() - start_time).total_seconds()

        if not success:
            return SpeechToTextResponse(
                success=False,
                text="",
                language_info="",
                bedrock_analysis=None,
                error="Transcription or Bedrock analysis failed",
                processing_time=processing_time
            )
        
        return SpeechToTextResponse(
            success=True,
            text=text,
            language_info=language_info,
            bedrock_analysis=bedrock_result,
            processing_time=processing_time
        )
    except Exception as e:
        processing_time = (datetime.now() - start_time).total_seconds()
        return SpeechToTextResponse(
            success=False,
            error=str(e),
            processing_time=processing_time
        )

@app.post("/text-analysis", response_model=TextAnalysisResponse)
async def text_analysis(request: TextAnalysisRequest):
    """
    Analyze text content for insights and sentiment
    Parameters:
    - text_content: The text content to analyze
    - country: Optional country context for analysis (default: Malaysia)
    """
    start_time = datetime.now()
    
    try:
        # Analyze the text content
        analysis_output = process_text_content(
            request.text_content, country=request.country
        )
        
        processing_time = (datetime.now() - start_time).total_seconds()

        if analysis_output.get("success"):
            return TextAnalysisResponse(
                success=True,
                analysis_result=analysis_output.get("analysis_result") or {},
                processing_time=processing_time
            )
        else:
            return TextAnalysisResponse(
                success=False,
                analysis_result={},
                error=analysis_output.get("error", "Text analysis failed"),
                processing_time=processing_time
            )
            
    except Exception as e:
        processing_time = (datetime.now() - start_time).total_seconds()
        return TextAnalysisResponse(
            success=False,
            error=str(e),
            processing_time=processing_time
        )

@app.post("/image-analysis", response_model=ImageAnalysisResponse) 
async def analyze_image(request: ImageAnalysisRequest):
    """
    Analyze base64-encoded image using Amazon Nova Pro and AWS Bedrock flow
    
    Parameters:
    - image_base64: Base64-encoded image data
    - image_format: Image format (jpeg, png, webp, gif)
    - country: Country context for analysis (default: Malaysia)
    """
    start_time = datetime.now()
    
    try:
        # Process image with Nova Pro and Bedrock flow
        result, _, success = process_base64_image_and_get_analysis(
            request.image_base64,
            request.image_format
        )
        
        processing_time = (datetime.now() - start_time).total_seconds()
        
        if success:
            return ImageAnalysisResponse(
                success=True,
                analysis_result=result if result is not None else {},
                image_description=result.get("image_description", "") if isinstance(result, dict) else "",
                processing_time=processing_time
            )
        else:
            return ImageAnalysisResponse(
                success=False,
                analysis_result=result if result is not None else {},
                image_description=result.get("image_description") if isinstance(result, dict) and result.get("image_description") is not None else "",
                error=str(result),
                processing_time=processing_time
            )
            
    except Exception as e:
        processing_time = (datetime.now() - start_time).total_seconds()
        return ImageAnalysisResponse(
            success=False,
            error=str(e),
            processing_time=processing_time
        )
