import boto3
import os

AWS_REGION = "us-east-1"

def get_bedrock_client():
    """
    Returns a boto3 client for Amazon Bedrock Runtime.
    Picks up credentials from env vars or hardcoded fallback.
    """
    return boto3.client(
        service_name="bedrock-runtime",
        region_name=AWS_REGION,
        aws_access_key_id="ASIAWXC6KQOHQ7N6ROGE",
        aws_secret_access_key="aGwUhisdVlhcGScGjihYK63I26fl0LkN0CJj3pHj",
        aws_session_token="IQoJb3JpZ2luX2VjEIv//////////wEaDmFwLXNvdXRoZWFzdC0xIkcwRQIhAPI1vlVj6rnd8ZEi6ERH3LoDoFs85O4OltR00a91eAK3AiBPWdjDcu+qnkGPfn0aQ6pvfqTm8waJ6tM3BSxkyH2UhyqOAwgUEAAaDDQ2MTkwNjgwNTY0NyIMsEsfyLJyYkHvTKHqKusCXSCH0EPOuW+FKOWOVmGf3MSYzqKiJE+MVm3p9/o7n1ManCjd9QfxoX7IVvbXwNBwVSEvJ5uYRaWQG9kjzb8c96016Licf4ComBn04O54X1ZaNiT7Z5NGAGF/XS1xb673o3WrsboHCBFSxI+kEigLfVo0Yo669C8H7wflh+BGzV/3YUA2zYDTx3IsqJCx6VTYdugQTNXm/IyDobwO+H8QYVnYvMWBbCHy140S9s7nbqYIjHAOLOygGqyZRdRn5sp6yMneL2b+q/mVZPnzRfuz9ZzqjlS6BU/Xk7mhiFy3mAKnDzZIWM8sZFVQtkPoOsTXY60kjoRkkK/ILQlduWoQzwpaRW+4D2TntSef3Qr1BTbR+xCFynJYpT1mR0mdE8DfJ7Mt9FKjJQhKSeT14++QhQATReuPX8733yWwAF8Wt5J0p1IDzKlpnpVzWMUCJ1wfk+g78wiZAOsOCKxVp4vK5D/NPoPO9E65z50HMMGnv8YGOqYBsTXt+mkzBMX4u5WZNgI7ofbJSx6Zi3wrpuAGEECzhv/ZvxJkMpdxKdTpS+0pyDM/KR+oiZ+eYY61rF0D3nogAmPNoek6golYpDDeYIP34rXxnbnjUiZe9y2AGO6xPvCmB2VzMu1WWhkilvdTr/YlhgFCG3vGvBHW9XLtOHEKhwr/afM00BdIfi30sUhETrMSeGuV8tb2/y+tQpp0yjyo8aa7A6NkEA=="
    )
