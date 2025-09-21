# bedrock.py
import json
import boto3
from bedrockClient import get_bedrock_client
 
AWS_REGION = "us-east-1"
 
DEFAULT_MODEL_ID = "amazon.nova-pro-v1:0"
DEFAULT_EMBED_MODEL = "amazon.titan-embed-text-v2:0"
 
 
class Bedrock:
    def __init__(self):
        """Initialize a Bedrock client (reused for all calls)."""
        self.bedrock_client = get_bedrock_client()
 
    def converse(self, parameters):
        """
        Call a Bedrock model using the Converse API (for Amazon Nova).
        Returns (message, usage).
        """
        model_id = parameters.get("model_id", DEFAULT_MODEL_ID)
        messages = parameters.get("messages", [])
        system = parameters.get("system")
        tool_config = parameters.get("tool_config")
        inference_config = parameters.get("inference_config")
 
        default_inference_config = {"maxTokens": 1000, "temperature": 0}
 
        kwargs = {
            "modelId": model_id,
            "messages": messages,
            "inferenceConfig": inference_config or default_inference_config,
        }
 
        if system:
            kwargs["system"] = system
 
        if tool_config:
            kwargs["toolConfig"] = {"tools": tool_config}
 
        response = self.bedrock_client.converse(**kwargs)
 
        response_message = response["output"]["message"]
        usage = response.get("usage")
 
        return response_message, usage
 
    def converse_stream(self, parameters):
        """
        Call a Bedrock model using the Converse Stream API (Nova Pro).
        Returns a generator that yields streamed output text.
        """
        model_id = parameters.get("model_id", DEFAULT_MODEL_ID)
        messages = parameters.get("messages", [])
        system = parameters.get("system")
        tool_config = parameters.get("tool_config")
        inference_config = parameters.get("inference_config")
 
        default_inference_config = {"maxTokens": 1000, "temperature": 0}
 
        kwargs = {
            "modelId": model_id,
            "messages": messages,
            "inferenceConfig": inference_config or default_inference_config,
        }
 
        if system:
            kwargs["system"] = system
        if tool_config:
            kwargs["toolConfig"] = {"tools": tool_config, "toolChoice": {"any": {}}}
 
        response = self.bedrock_client.converse_stream(**kwargs)
 
        for event in response["stream"]:
            if "output" in event:
                for content in event["output"]["message"]["content"]:
                    if "text" in content:
                        yield content["text"]
 
    def generate_embedding(self, text):
        """
        Generate embeddings using Amazon Titan.
        """
        response = self.bedrock_client.invoke_model(
            modelId=DEFAULT_EMBED_MODEL,
            contentType="application/json",
            body=json.dumps({"inputText": text, "dimensions": 1024}),
        )
 
        result = json.loads(response["body"].read())
        embeddings = result.get("embedding") or result.get("embeddings", [])[0]
        return embeddings

    def generate_image(self, prompt, width=512, height=512):
        """
        Generate an image using Amazon Titan Image Generator v2.
        Returns raw bytes of the first image.
        """
        response = self.bedrock_client.invoke_model(
            modelId="amazon.titan-image-generator-v2:0",
            contentType="application/json",
            accept="application/json",
            body=json.dumps({
                "taskType": "TEXT_IMAGE",
                "textToImageParams": {
                    "text": prompt
                },
                "imageGenerationConfig": {
                    "numberOfImages": 1,
                    "quality": "premium",  # "standard" or "premium"
                    "height": height,
                    "width": width,
                    "cfgScale": 8.0,
                    "seed": 42
                }
            }),
        )

        result = json.loads(response["body"].read())
        image_b64 = result["images"][0]
        import base64
        return base64.b64decode(image_b64)
