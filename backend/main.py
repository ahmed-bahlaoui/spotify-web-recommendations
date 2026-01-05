import os
import shutil

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from processor import analyze_track, generate_waveplot

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


@app.post("/waveplot")
async def waveplot_endpoint(file: UploadFile = File(...)):
    """Generate a waveplot image from an uploaded audio file."""
    temp_path = f"temp_{file.filename}"
    output_image = f"waveplot_{file.filename}.png"
    image_path = None

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        image_path = generate_waveplot(temp_path, output_image)
        return FileResponse(image_path, media_type="image/png", filename="waveplot.png")
    except Exception as e:
        return {"error": str(e)}
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="localhost", port=8000)
