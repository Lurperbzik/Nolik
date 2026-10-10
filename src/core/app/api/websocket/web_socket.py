import asyncio, json
from fastapi import WebSocket, APIRouter


router = APIRouter(tags=["WebSocket"])

websocket_clients = set()
@router.websocket("/api/websocket")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    websocket_clients.add(websocket)
    try:
        while True:
            await websocket.receive_text()  
    except:
        websocket_clients.remove(websocket)

async def send_message_wb(message: dict):
    if websocket_clients:
        await asyncio.gather(*[ws.send_text(json.dumps(message)) for ws in websocket_clients])

