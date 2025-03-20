from pydantic import BaseModel, Field
from typing import Optional
import base64


class CollectionSchema(BaseModel):
    name: str = Field(example="collection_name")
    description: Optional[str] = Field(default="", example="This is a collection")

class IssueSchema(BaseModel):
    body: str = Field(example="issue_body")

class RepoUrlSchema(BaseModel):
    url: str = Field()

"""
Collection names in milvus just support letters, numbers, and underscores.
This function encodes the collection name to be used in milvus.
"""
def encode_Base64(text: str) -> str:
    encoded = base64.urlsafe_b64encode(text.encode()).decode() 
    return encoded.replace("=", "_")  

def decode_Base64(encoded: str) -> str:
    padded = encoded.replace("_", "=") 
    return base64.urlsafe_b64decode(padded.encode()).decode()