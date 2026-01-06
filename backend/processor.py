import os

import librosa
import matplotlib.pyplot as plt
import numpy as np


def analyze_track(file_path) -> dict:
    """
    This function that takes an audio file path as input and
    returns a tuple containing the estimated musical key and tempo (BPM).

    Args:
        file_path (str): Path to the audio file.
    Returns:
        tuple: A tuple containing the estimated key (str) and tempo (float).
    """
    # 1. Load the audio file
    y, sr = librosa.load(file_path)

    # 2. Extract Tempo (BPM)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    # Ensure tempo is extracted as a scalar to avoid NumPy deprecation warnings
    tempo = float(np.array(tempo).ravel()[0])

    # 3. Estimate the most frequent / dominant pitch class using chroma
    chroma = librosa.feature.chroma_stft(y=y, sr=sr)
    # Sum energy across time for each of the 12 pitch classes
    chroma_sum = np.sum(chroma, axis=1)
    # Map index to note name (using sharps)
    note_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    dominant_idx = int(np.argmax(chroma_sum))
    key = note_names[dominant_idx]

    return {
        "bpm": round(tempo, 1),
        "key": key,
        "duration": round(librosa.get_duration(y=y, sr=sr), 2),
    }


def generate_waveplot(file_path: str, output_image_path: str) -> str:
    """
    Generates a waveplot image from an audio file.

    Args:
        file_path (str): Path to the audio file.
        output_image_path (str): Filename for the generated waveplot image.

    Returns:
        str: Full path to the saved waveplot image.
    """

    # Load the audio file
    y, sr = librosa.load(file_path)

    # Create a waveplot
    plt.figure(figsize=(16, 6))
    librosa.display.waveshow(y, sr=sr, max_points=10000, axis="time", color="blue")

    plt.title("Waveform")
    plt.xlabel("Time (s)")
    plt.ylabel("Amplitude")

    # Ensure waveforms directory exists
    save_dir = os.path.join(os.getcwd(), "waveforms")
    os.makedirs(save_dir, exist_ok=True)

    full_path = os.path.join(save_dir, output_image_path)
    plt.savefig(full_path)
    plt.close()

    return full_path
