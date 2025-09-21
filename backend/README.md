# 🚀 How to Use:
## 1. Basic Transcription (Fast)
```POST /speech-to-text
{
  "video_base64": "data:video/mp4;base64,AAAAHGZ0eXBpc29t...",
  "use_bedrock": false
}
```

Response:
```
{
  "success": true,
  "text": "Hello, this is the transcribed text...",
  "language_info": "🌍 Detected Language: en-US (confidence: 0.95)",
  "processing_time": 45.67
}
```

## 2. Enhanced Analysis (Transcription + Bedrock)
```
POST /speech-to-text
{
  "video_base64": "data:video/mp4;base64,AAAAHGZ0eXBpc29t...",
  "use_bedrock": true
}
```

Response:
```
{
  "success": true,
  "text": "Hello, this is the transcribed text...",
  "language_info": "🌍 Detected Language: en-US (confidence: 0.95)",
  "bedrock_analysis": {
    "success": true,
    "flow_outputs": [...],
    "bedrock_results": [...],
    "input_document": {
      "content": "Hello, this is the transcribed text...",
      "country": "Malaysia",
      "file_type": "video"
    }
  },
  "processing_time": 78.45
}
```

## 3. 🌐 Frontend Integration Example:
```
// Basic transcription
const basicTranscription = async (videoBase64) => {
  const response = await fetch('http://localhost:8000/speech-to-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      video_base64: videoBase64,
      use_bedrock: false
    })
  });
  return await response.json();
};

// Enhanced analysis with Bedrock
const enhancedAnalysis = async (videoBase64) => {
  const response = await fetch('http://localhost:8000/speech-to-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      video_base64: videoBase64,
      use_bedrock: true  // Enable Bedrock analysis
    })
  });
  return await response.json();
};
```