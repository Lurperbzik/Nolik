from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers.github_router import router as github_router
from app.api.routers.main_router import router as main_router
from app.api.websocket.web_socket import router as websocket_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(github_router)
app.include_router(main_router)
app.include_router(websocket_router)

