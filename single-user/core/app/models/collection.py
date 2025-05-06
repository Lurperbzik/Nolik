from pydantic import BaseModel
from typing import Optional, List


class IssueComment(BaseModel):
    body: str
    author: Optional[str] = None

class Issue(BaseModel):
    number: int 
    title: str 
    body: str 
    state: Optional[str] = None
    state_reason: Optional[str] = None
    url: str 
    author: Optional[str] = None
    comments: List[IssueComment] = []

class Collection(BaseModel):
    name: str 
    owner: str 
    url: str 
    platform: str
    issues: List[Issue] = []


class EmbeddedIssue(BaseModel):
    embedding: List[float]
    issue: Issue

class EmbeddedCollection(BaseModel):
    name: str 
    owner: str 
    url: str 
    platform: str
    embedded_issues: List[EmbeddedIssue] = []
