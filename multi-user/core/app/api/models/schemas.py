from pydantic import BaseModel 

class CollectionUrlSchema(BaseModel):
    url: str


class CollectionSchema(BaseModel):
    name: str 
    owner: str
    url: str 
    platform: str

class SearchSchema(BaseModel):
    collection_url: str
    issue: str 

    
class AdvancedSearchSchema(BaseModel):
    collection_url: str
    issue: str 
    limit: int = 5
    required_words: list[str] = []
    accepted_deviation: float = 1000
    min_num_comments: int = 0
    state: str = "closed"
