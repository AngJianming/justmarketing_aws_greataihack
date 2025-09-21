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
        aws_access_key_id="ASIAWXC6KQOH3OOX3QVZ",
        aws_secret_access_key="4Vg5NAOoqEHMs/9OnDNT1CXpEZAmELPHaiNNbMRh",
        aws_session_token="IQoJb3JpZ2luX2VjEI///////////wEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAOYU9tmrpZOVN+0vmyk+UVfTMvp0CvuGmCw+BPEmF7sLAiEA7U9WePi8/CGIIU2xzC8hmFNvhvUCHbIdqESgNtBxQ2cqjgMIGBAAGgw0NjE5MDY4MDU2NDciDLTKmPnWvX0sdZUrmyrrAoBj+jxSWQRGCNLn4C+Re2FbH/4u6I0LwkpqizsN4Nj7rIiNnds+KlVOrG8mKMJWU0LI7EIfCVxIB3G2muELPUxv0n9Mki+yndmMJKMtw4Cm4HEmaTUvQZ/MuBzdKyMYb9FLDj/M3dbv5yX6iQstMGybpJW1UNA+50dyrnXLDImn1T8idqZa5rAN/14L5zmL0aeghUWKAHPCrsGEsrK0Cmxe/stMhpKKCrRWb2U2WJLhD93FTMNU5zOy6z1XSXE+zRD8vUeprZpCaELWDtzbbS3ae9G2B1e8lhbuQ7bQh+XD+3cNbUMq/lgclVV1YD1MNP8XvfOxF55dkjVp/mHiKfeWWnau4amBmT5b3NQ1/xUhjrgsPOlLifScdVyLQ6sJse1rkU9TJlL3CEN78EAI1EY7lOT5rHFj6tHruth4POiP5V5zUuujdpxSZk6Oe2/2Ba/ygW5v7ykO9dEVvYzhiDhkDd+NNWCbdaEx0jCrncDGBjqlAeJrlJANn6rdlEs1vOYmNZva2ZjJP1PF9Hd+GXAoXsVdnNx68pDrUz0ruropJXkWerapemyxrzUfgkYU7AJxdBaG2OzcUBZ9Wv2YwsPjiVs3zLnVXvddhdiIazaCWjO0V5LnUr+sZ3CklprZnhwxwZU1+g1Lu3zOHOKS1ugjxWeG2AOXFxFHdHPncab11409dsPxBHrN44RP+OsCuKOatmTqJByOPw=="
    )
