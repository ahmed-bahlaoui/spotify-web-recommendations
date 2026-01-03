from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from processor import analyze_track  # Import your script

app = FastAPI()

# Enable CORS (Allows your React frontend to talk to this Python backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze")
async def analyze_endpoint(file: UploadFile = File(...)):
    # 1. Save file temporarily
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # 2. Run YOUR script
        results = analyze_track(temp_path)
        return results
    except Exception as e:
        return {"error": str(e)}
    finally:
        # 3. Clean up (delete the file)
        if os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
