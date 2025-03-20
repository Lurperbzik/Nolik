from pydantic import BaseModel
from typing import Literal
from app.models.issues import Issues, RepositoryIssues, Issue, Comment

class Client(BaseModel):
    name: Literal['github', 'jira']

class ClientException(Exception):
    def __init__(self, message, status_code):
        super().__init__(message)
        self.status_code = status_code