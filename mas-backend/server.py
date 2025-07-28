import asyncio
import websockets
import json
from model import BrewMastersModel
import os
import atexit # Import atexit for cleanup on exit

game_model = BrewMastersModel()

LOG_FILE = "log.txt"

# Function to write logs to file
def write_logs_to_file(logs):
    with open(LOG_FILE, "a") as f: # Use "a" for append mode
        for log_entry in logs:
            f.write(log_entry + "\n")

# Function to clean up log.txt on server process exit
def cleanup_log_file():
    if os.path.exists(LOG_FILE):
        os.remove(LOG_FILE)
        print(f"Cleaned up {LOG_FILE} on server exit.")

async def handler(websocket, path):
    print("Front-end client connected.")
    try:
        # Clear log.txt on initial client connection to start fresh for a new game session
        # This covers cases where the server is still running but a new frontend session starts.
        if os.path.exists(LOG_FILE):
            os.remove(LOG_FILE)
            print(f"Cleaned up {LOG_FILE} for new session.")
        
        initial_state = game_model.get_state_as_json()
        await websocket.send(initial_state)
        
        # Write initial game state logs to file
        initial_game_state_data = json.loads(initial_state)
        write_logs_to_file(initial_game_state_data['event_log'])

        async for message in websocket:
            human_decisions = json.loads(message)
            print(f"Received human decisions: {human_decisions}")
            
            # Process the turn
            game_model.step(human_decisions)
            
            # Get the updated game state
            updated_state = game_model.get_state_as_json()
            updated_game_state_data = json.loads(updated_state)
            
            # Write current turn's event logs to file
            write_logs_to_file(updated_game_state_data['event_log'])

            # Send updated state to frontend
            await websocket.send(updated_state)
            
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected.")
    except Exception as e:
        print(f"An error occurred in handler: {e}")
        # Optionally write error to log file
        with open(LOG_FILE, "a") as f:
            f.write(f"ERROR in handler: {e}\n")


async def main():
    """Starts the WebSocket server."""
    # Register the cleanup function to run when the Python script exits
    atexit.register(cleanup_log_file)
    
    async with websockets.serve(handler, "0.0.0.0", 8765):
        print("BrewMasters MAS Server started on port 8765...")
        await asyncio.Future()  # Run forever

if __name__ == "__main__":
    asyncio.run(main())