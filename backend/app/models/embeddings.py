from pydantic import BaseModel, Field
from typing import List, Literal

from app.models.issues import Issue, RepositoryIssues 

class IssueWithEmbedding(BaseModel):
    embedding: List[float] = Field(..., example=[0.1, 0.2, 0.3], title="Issue embedding")
    issue: Issue 

class RepositoryIssuesWithEmbeddings(BaseModel):
    url: str = Field(..., title="API URL")
    issues: List[IssueWithEmbedding]