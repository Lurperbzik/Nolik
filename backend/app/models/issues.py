from pydantic import BaseModel, Field 
from typing import List, Optional, Literal

class Comment(BaseModel):
    body: str = Field(..., example="Comment", title="Comment body")
    author: Optional[str] = Field(..., example="Author", title="Author name")

class Issue(BaseModel):
    number: int = Field(..., example=1, title="Issue number")
    title: str = Field(..., example="Issue", title="Issue title")
    body: str = Field(..., example="Issue body", title="Issue body")
    state: str = Field(..., example="open", title="Issue state")
    state_reason: Optional[str] = Field(default=None, example="opened", title="Issue state reason")
    url: str = Field(..., title="Issue URL")
    author: Optional[str] = Field(..., example="Author", title="Author name")
    comments: List[Comment] = Field(default=[], example=[Comment(body="Comment", author="Author")], title="Issue comments")

class Issues(BaseModel):
    issues: List[Issue] = Field(default=[], example=[Issue(number=1, title="Issue", body="Issue body", state="open", url="", author="Author", comments=[Comment(body="Comment", author="Author")])], title="Issues")

class RepositoryIssues(BaseModel):
    url: str = Field(..., title="API URL")
    issues: List[Issue] = Field(default=[], example=[Issue(number=1, title="Issue", body="Issue body", state="open", url="", author="Author", comments=[Comment(body="Comment", author="Author")])], title="Issues")
