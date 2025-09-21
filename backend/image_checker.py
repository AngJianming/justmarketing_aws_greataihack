"""
Image to Text Pipeline using Amazon Nova Pro
Simple flow: Image -> Bedrock (Nova Pro) -> Text Description
"""
import boto3
import json
import os
import base64
from dotenv import load_dotenv

load_dotenv()

class ImageToTextPipeline:
    def __init__(self, model_id='us.amazon.nova-pro-v1:0'):
        """
        Initializes the pipeline with a Bedrock runtime client.
        """
        self.region = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
        self.bedrock_runtime = boto3.client('bedrock-runtime', region_name=self.region)
        self.model_id = model_id

    def _get_image_format(self, image_file_path):
        """Determines the image format from its file extension."""
        ext = os.path.splitext(image_file_path)[1].lower()
        if ext in ['.jpg', '.jpeg']:
            return 'jpeg'
        elif ext == '.png':
            return 'png'
        elif ext == '.webp':
            return 'webp'
        elif ext == '.gif':
            return 'gif'
        else:
            raise ValueError(f"Unsupported image format: {ext}")

    def describe_image(self, image_file_path, prompt="Describe this image in detail."):
        """
        Generate description for an image using Amazon Nova Pro.
        Returns: tuple (description, success)
        """
        try:
            with open(image_file_path, "rb") as f:
                image_data = f.read()

            base64_image_data = base64.b64encode(image_data).decode('utf-8')
            image_format = self._get_image_format(image_file_path)

            # System instructions
            system_list = [
                {"text": "You are an expert image analyst. Provide a detailed description of the image including objects, people, activities, setting, and any notable details."}
            ]

            # User message with image and text prompt
            message_list = [
                {
                    "role": "user",
                    "content": [
                        {
                            "image": {
                                "format": image_format,
                                "source": {"bytes": base64_image_data}
                            }
                        },
                        {
                            "text": prompt
                        }
                    ]
                }
            ]

            # Inference parameters
            inference_config = {
                "maxTokens": 10240,
                "temperature": 0.3,
                "topP": 0.9
            }

            # Full request payload
            native_request = {
                "schemaVersion": "messages-v1",
                "system": system_list,
                "messages": message_list,
                "inferenceConfig": inference_config
            }

            # Invoke Nova Pro
            response = self.bedrock_runtime.invoke_model(
                modelId=self.model_id,
                body=json.dumps(native_request),
                contentType='application/json',
                accept='application/json'
            )

            response_body = json.loads(response['body'].read())
            description = response_body["output"]["message"]["content"][0]["text"]

            return description, True

        except Exception as e:
            return None, False


class BedrockFlowInvoker:
    """
    Invokes a Bedrock Flow for cultural analysis.
    """
    def __init__(self, flow_id="CJB0RNM9XM", flow_alias="I4LBMMG8G8"):
        """
        Initializes the invoker with a Bedrock Agent Runtime client.
        """
        self.region = os.getenv('AWS_DEFAULT_REGION', 'us-east-1')
        self.client = boto3.client("bedrock-agent-runtime", region_name=self.region)
        self.flow_id = flow_id
        self.flow_alias = flow_alias

    def invoke_cultural_analysis_flow(self, text_content, country="Malaysia", file_type="image"):
        """
        Invokes the cultural analysis flow with the given text content
        and streams the response.
        Returns: tuple (result_data, log_messages, success)
        """
        log_messages = []
        
        try:
            # Build input document based on the user's example
            input_document = {
                "content": text_content,
                "country": country,
                "file_type": file_type
            }

            log_messages.append(f"Invoking Bedrock flow with input: {input_document}")

            # Invoke the flow
            response = self.client.invoke_flow(
                flowIdentifier=self.flow_id,
                flowAliasIdentifier=self.flow_alias,
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

            final_output = None
            for event in response["responseStream"]:
                # Each event is a dict with exactly one key
                for event_type, event_value in event.items():
                    if event_type == "flowOutputEvent":
                        # The output is nested under 'content' and then 'document'
                        output_value = event_value.get('content', {}).get('document')
                        if output_value:
                            final_output = output_value
                            log_messages.append(f"Flow output received: {type(output_value)}")
                    elif event_type == "exception":
                        log_messages.append(f"Exception received from Bedrock Flow: {json.dumps(event_value)}")
                        return None, log_messages, False

            if final_output:
                log_messages.append("Bedrock flow completed successfully")
                return final_output, log_messages, True
            else:
                log_messages.append("No output received from Bedrock flow")
                return None, log_messages, False

        except Exception as e:
            log_messages.append(f"Error invoking Bedrock Flow: {str(e)}")
            return None, log_messages, False



def process_base64_image_and_get_analysis(base64_data: str, image_format: str, country: str = "Malaysia") -> dict:
    """
    Processes a base64-encoded image to generate a description and then runs
    it through a cultural analysis Bedrock Flow.

    Args:
        base64_data (str): The base64-encoded image data.
        image_format (str): The image format (jpeg, png, webp, gif).
        country (str): The country context for analysis.

    Returns:
        dict: A dictionary containing the analysis result, logs, and status.
    """
    result = {
        "success": False,
        "analysis_result": None,
        "image_description": None,
        "logs": [],
        "error": None
    }
    
    result["logs"].append(f"Processing base64 image data ({len(base64_data)} characters)")
    
    try:
        # Generate image description
        pipeline = ImageToTextPipeline()

        # System instructions
        system_list = [
            {"text": "You are an expert image analyst. Provide a detailed description of the image including objects, people, activities, setting, and any notable details."}
        ]

        # User message with image and text prompt
        message_list = [
            {
                "role": "user",
                "content": [
                    {
                        "image": {
                            "format": image_format,
                            "source": {"bytes": base64_data}
                        }
                    },
                    {
                        "text": "Describe this image in detail."
                    }
                ]
            }
        ]

        # Inference parameters
        inference_config = {
            "maxTokens": 10240,
            "temperature": 0.3,
            "topP": 0.9
        }

        # Full request payload
        native_request = {
            "schemaVersion": "messages-v1",
            "system": system_list,
            "messages": message_list,
            "inferenceConfig": inference_config
        }

        # Invoke Nova Pro
        response = pipeline.bedrock_runtime.invoke_model(
            modelId=pipeline.model_id,
            body=json.dumps(native_request),
            contentType='application/json',
            accept='application/json'
        )

        response_body = json.loads(response['body'].read())
        description = response_body["output"]["message"]["content"][0]["text"]
        
        result["image_description"] = description
        result["logs"].append("Image description generated successfully")
        
        # Process the description through cultural analysis
        result["logs"].append("Invoking cultural analysis flow")
        flow_invoker = BedrockFlowInvoker()
        flow_result, flow_logs, flow_success = flow_invoker.invoke_cultural_analysis_flow(
            description, country=country, file_type="image"
        )
        
        result["logs"].extend(flow_logs)
        
        if flow_success and flow_result:
            result["success"] = True
            result["analysis_result"] = flow_result
            result["logs"].append("Base64 image analysis completed successfully")
        else:
            result["error"] = "Failed to get result from Bedrock Flow"
            result["logs"].append("Base64 image analysis failed")
            
    except Exception as e:
        result["error"] = f"Error processing base64 image: {str(e)}"
        result["logs"].append(f"Exception occurred: {str(e)}")

    return result["analysis_result"], result["logs"], result["success"]




