# Setup and configuration

## Make sure you have uv installed (Highly recommended !!)



### 1. Install dependencies

```bash
uv sync
```

### 2. Activate uv environment (containing Python 3.14 and all required dependencies)

Execute the following commands in the backend directory:

#### On Windows:

```bash
.\.venv\Scripts\activate
```

#### On MacOS / Linux:

```bash
source .venv/bin/activate
```

### Note:
#### if you did not install uv you can still install project dependencies
please execute the following inside the backend directory

```bash
pip install -r requirements.txt

```

### 3. Run the server

```bash
uvicorn main:app --reload
```

Or alternatively:

```bash
python main.py
```

The server will start at `http://localhost:8000`


---

## API Endpoints

### POST `/analyze`

Analyzes an uploaded audio file and returns musical properties.

**Request:**

- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: `file` - Audio file (MP3, WAV, etc.)

**Response:**

```json
{
  "bpm": 120.5,
  "key": "C#",
  "duration": 180.25
}
```

**Example using curl:**

```bash
curl -X POST "http://localhost:8000/analyze" \
  -F "file=@your-audio-file.mp3"
```

**Response Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `bpm` | float | Estimated tempo in beats per minute |
| `key` | string | Dominant musical key (e.g., "C", "F#", "A") |
| `duration` | float | Track duration in seconds |
