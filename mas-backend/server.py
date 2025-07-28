import asyncio
import websockets
import json
from model import BrewMastersModel

game_model = BrewMastersModel()

async def handler(websocket, path):
    print("Front-end client connected.")
    try:
        await websocket.send(game_model.get_state_as_json())
        async for message in websocket:
            human_decisions = json.loads(message)
            print(f"Received human decisions: {human_decisions}")
            game_model.step(human_decisions)
            await websocket.send(game_model.get_state_as_json())
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")

async def main():
    async with websockets.serve(handler, "0.0.0.0", 8765):
        print("BrewMasters MAS Server started on port 8765...")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())