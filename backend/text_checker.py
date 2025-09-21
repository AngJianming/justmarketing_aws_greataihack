"""
Text File to Cultural Analysis Pipeline
Simple flow: Text File -> Bedrock Flow -> Analysis JSON
"""
import boto3
import json
import os

class BedrockFlowInvoker:
    """
    Invokes a Bedrock Flow for cultural analysis.
    """
    def __init__(self, flow_id="CJB0RNM9XM", flow_alias="I4LBMMG8G8"):
        """
        Initializes the invoker with a Bedrock Agent Runtime client.
        """
        self.region = 'us-east-1'
        self.client = boto3.client("bedrock-agent-runtime", region_name=self.region)
        self.flow_id = flow_id
        self.flow_alias = flow_alias

    def invoke_cultural_analysis_flow(self, text_content, country="Malaysia", file_type="text"):
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


def process_text_content(text_content: str, country: str = "Malaysia") -> dict:
    """
    Processes text content and runs it through a cultural analysis
    Bedrock Flow. Designed for server use.

    Args:
        text_content (str): The text content to analyze.
        country (str): The country context for analysis.

    Returns:
        dict: A dictionary containing the analysis result and status.
    """
    result = {
        "success": False,
        "analysis_result": None,
        "error": None
    }

    try:
        flow_invoker = BedrockFlowInvoker()
        flow_result, _, success = flow_invoker.invoke_cultural_analysis_flow(
            text_content, country=country, file_type="text"
        )

        if success and flow_result:
            result["success"] = True
            result["analysis_result"] = flow_result
        else:
            result["error"] = "Failed to get result from Bedrock Flow"

    except Exception as e:
        result["error"] = f"Error during text analysis: {str(e)}"

    return result


def process_text_and_get_analysis(file_path: str) -> dict:
    """
    Processes a single text file and runs it through a cultural analysis
    Bedrock Flow. Designed for server use.

    Args:
        file_path (str): The path to the text file.

    Returns:
        dict: A dictionary containing the analysis result, logs, and status.
    """
    result = {
        "success": False,
        "analysis_result": None,
        "logs": [],
        "error": None,
        "file_info": {
            "path": file_path,
            "exists": False,
            "size": 0
        }
    }
    
    result["logs"].append(f"Reading content from text file '{file_path}'")
    
    try:
        # Check if file exists
        if not os.path.exists(file_path):
            result["error"] = f"File not found: {file_path}"
            result["logs"].append(f"File not found at '{file_path}'")
            return result
            
        result["file_info"]["exists"] = True
        result["file_info"]["size"] = os.path.getsize(file_path)
        
        with open(file_path, "r", encoding="utf-8") as f:
            text_content = f.read()
            
        result["logs"].append(f"Text content read successfully ({len(text_content)} characters)")
        
        # Process the text content
        analysis_result = process_text_content(text_content)

        # Merge results
        result["success"] = analysis_result.get("success", False)
        result["analysis_result"] = analysis_result.get("analysis_result")
        result["logs"].extend(analysis_result.get("logs", []))
        if analysis_result.get("error"):
            result["error"] = analysis_result["error"]
            
    except Exception as e:
        result["error"] = f"Failed to read file: {str(e)}"
        result["logs"].append(f"Error reading file: {str(e)}")

    return result  # Ensure the function returns a single dictionary object


def main():
    text_files = [f for f in os.listdir('.') if f.lower().endswith('.txt')]

    if text_files:
        text_file = text_files[0]
        print(f"Found text file: {text_file}. Starting analysis pipeline...")
        analysis_result = process_text_and_get_analysis(text_file)

        print("\n--- Final Analysis Result (JSON) ---")
        print(json.dumps(analysis_result, indent=2))
        print("------------------------------------")
    else:
        print("No text files with extension (.txt) found in the current directory.")
