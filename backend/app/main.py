from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware

from app.routers.general import router as general_router
from app.routers.milvus import router as milvus_router
from app.routers.github_utils import router as github_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(general_router)
app.include_router(milvus_router)
app.include_router(github_router)
