"""
Test script for the Video Speech-to-Text API
"""
import requests
import base64
import json

# API base URL
BASE_URL = "http://localhost:8000"

def test_connection():
    """Test the API connection"""
    print("🔍 Testing API connection...")
    
    try:
        response = requests.get(f"{BASE_URL}/testing")
        if response.status_code == 200:
            print("✅ API connection successful!")
            print(json.dumps(response.json(), indent=2))
            return True
        else:
            print(f"❌ API connection failed: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"❌ Connection error: {str(e)}")
        return False

def test_health_check():
    """Test the health check endpoint"""
    print("🏥 Testing health check...")
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Health check successful: {result['status']}")
            print(json.dumps(result, indent=2))
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            print(response.text)
            return False
    except Exception as e:
        print(f"❌ Health check error: {str(e)}")
        return False

def test_text_analysis(text_content):
    """Test the text analysis endpoint"""
    print("📝 Testing text analysis...")
    print(f"Text to analyze: {text_content[:100]}...")
    
    try:
        payload = {
            "text_content": text_content,
            "country": "Malaysia"
        }
        
        print("📤 Sending request to text analysis API...")
        response = requests.post(
            f"{BASE_URL}/text-analysis",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Text analysis successful!")
            print(f"Success: {result['success']}")
            
            if result['success']:
                print("📊 Analysis Results:")
                print(json.dumps(result['analysis_result'], indent=2))
                if result.get('logs'):
                    print("📋 Processing logs:")
                    for log in result['logs']:
                        print(f"  - {log}")
            else:
                print(f"❌ Analysis failed: {result.get('error', 'Unknown error')}")
                if result.get('logs'):
                    print("📋 Error logs:")
                    for log in result['logs']:
                        print(f"  - {log}")
            
            return result['success']
        else:
            print(f"❌ Request failed: {response.status_code}")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"❌ Text analysis error: {str(e)}")
        return False

def test_image_analysis(image_file_path):
    """Test the image analysis endpoint with an image file"""
    print(f"🖼️  Testing image analysis with: {image_file_path}")
    
    try:
        # Read and encode image file
        with open(image_file_path, 'rb') as image_file:
            image_data = image_file.read()
            image_base64 = base64.b64encode(image_data).decode('utf-8')
        
        # Determine image format from file extension
        image_format = image_file_path.split('.')[-1].lower()
        if image_format == 'jpg':
            image_format = 'jpeg'
        
        payload = {
            "image_base64": image_base64,
            "image_format": image_format,
            "country": "Malaysia"
        }
        
        print("📤 Sending request to image analysis API...")
        response = requests.post(
            f"{BASE_URL}/image-analysis",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Image analysis successful!")
            print(f"Success: {result['success']}")
            
            if result['success']:
                print("🖼️  Image Description:")
                print(result.get('image_description', 'No description available'))
                print("📊 Analysis Results:")
                print(json.dumps(result['analysis_result'], indent=2))
                if result.get('logs'):
                    print("📋 Processing logs:")
                    for log in result['logs']:
                        print(f"  - {log}")
            else:
                print(f"❌ Analysis failed: {result.get('error', 'Unknown error')}")
                if result.get('logs'):
                    print("📋 Error logs:")
                    for log in result['logs']:
                        print(f"  - {log}")
            
            return result['success']
        else:
            print(f"❌ Request failed: {response.status_code}")
            print(response.text)
            return False
            
    except FileNotFoundError:
        print(f"❌ Image file not found: {image_file_path}")
        return False
    except Exception as e:
        print(f"❌ Image analysis error: {str(e)}")
        return False

def test_speech_to_text(video_file_path, use_bedrock=False):
    """Test the speech-to-text endpoint with a video file"""
    print(f"🎥 Testing speech-to-text with: {video_file_path}")
    if use_bedrock:
        print("🔍 Including Bedrock flow analysis")
    
    try:
        # Read and encode video file
        with open(video_file_path, 'rb') as video_file:
            video_data = video_file.read()
            video_base64 = base64.b64encode(video_data).decode('utf-8')
        
        # Prepare request
        payload = {
            "video_base64": video_base64,
            "filename": video_file_path.split('/')[-1] if '/' in video_file_path else video_file_path.split('\\')[-1],  # Extract filename
            "use_bedrock": use_bedrock
        }
        
        print("📤 Sending request to API...")
        response = requests.post(
            f"{BASE_URL}/speech-to-text",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Speech-to-text request completed!")
            print(f"Success: {result['success']}")
            if result['success']:
                print(f"📝 Transcribed text: {result.get('text', 'No text')}")
                if result.get('language_info'):
                    print(f"🌍 Language info: {result.get('language_info')}")
                # Display Bedrock analysis if available
                if result.get('bedrock_analysis'):
                    analysis = result['bedrock_analysis']
                    print("\n🔍 BEDROCK ANALYSIS RESULTS:")
                    print(json.dumps(analysis, indent=2))
            else:
                print(f"❌ Speech-to-text failed: {result.get('error', 'Unknown error')}")
            return result['success']
        else:
            print(f"❌ Request failed: {response.status_code}")
            print(response.text)
            return False
            
    except FileNotFoundError:
        print(f"❌ Video file not found: {video_file_path}")
        return False
    except Exception as e:
        print(f"❌ Speech-to-text error: {str(e)}")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False

def main():
    """Main test function"""
    print("🚀 Starting comprehensive API tests...\n")
    
    # Test 1: Basic connection
    print("="*50)
    print("TEST 1: API Connection")
    print("="*50)
    if not test_connection():
        print("\n❌ Connection test failed. Make sure the API is running.")
        return
    
    # Test 2: Health check
    print("\n" + "="*50)
    print("TEST 2: Health Check")
    print("="*50)
    test_health_check()
    
    # Test 3: Text analysis
    print("\n" + "="*50)
    print("TEST 3: Text Analysis")
    print("="*50)
    try:
        with open("test.txt", "r", encoding="utf-8") as f:
            sample_text = f.read()
        print("✅ test.txt found, using its content for text analysis.")
        test_text_analysis(sample_text)
    except FileNotFoundError:
        print("⚠️  test.txt not found. Skipping text analysis test.")
    
    # Test 4: Image analysis (optional - requires image file)
    print("\n" + "="*50)
    print("TEST 4: Image Analysis (Optional)")
    print("="*50)
    image_file = "test_image.jpg"  # Update this path to your test image
    print(f"Looking for image file: {image_file}")
    try:
        with open(image_file, 'rb') as f:
            print("✅ Image file found, testing image analysis...")
            test_image_analysis(image_file)
    except FileNotFoundError:
        print(f"⚠️  Image file not found: {image_file}")
        print("   Skipping image analysis test. To test this endpoint:")
        print(f"   1. Place an image file named '{image_file}' in the same directory")
        print("   2. Run the test again")
    
    # Test 5: Speech-to-text (requires video file)
    print("\n" + "="*50)
    print("TEST 5: Speech-to-Text (Optional)")
    print("="*50)
    video_file = "test_video.mp4"  # Update this path to your test video
    print(f"Looking for video file: {video_file}")
    try:
        with open(video_file, 'rb') as f:
            print("✅ Video file found, testing speech-to-text...")
            
            # Test with Bedrock analysis
            print("\n--- Transcription with Bedrock Analysis Test ---")
            if test_speech_to_text(video_file, use_bedrock=True):
                print("✅ Bedrock analysis test passed!")
            else:
                print("❌ Bedrock analysis test failed.")
                
    except FileNotFoundError:
        print(f"⚠️  Video file not found: {video_file}")
        print("   Skipping speech-to-text test. To test this endpoint:")
        print(f"   1. Place a video file named '{video_file}' in the same directory")
        print("   2. Run the test again")
    
    print("\n" + "="*70)
    print("🎉 API TESTING COMPLETED!")
    print("="*70)
    print("Summary:")
    print("✅ Connection test - Always runs")
    print("✅ Health check - Always runs") 
    print("✅ Text analysis - Always runs")
    print("⚠️  Image analysis - Requires test image file")
    print("⚠️  Speech-to-text - Requires test video file")
    print("\nTo test all endpoints, make sure you have:")
    print("- test_image.jpg (for image analysis)")
    print("- test_video.mp4 (for speech-to-text)")
    print("="*70)

if __name__ == "__main__":
    main()