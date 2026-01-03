import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setData(null)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      // Connects to your Python Backend at port 8000
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      setData(response.data)
    } catch (err) {
      console.error(err)
      setError("Failed to analyze. Is the backend running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Audio Analyzer</h1>
      
      <div className="card upload-section">
        <input type="file" accept=".mp3,.wav" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={!file || loading}>
          {loading ? 'Analyzing...' : 'Analyze Track'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="card results-section">
          <h2>Analysis Results</h2>
          <div className="stat-grid">
            <div className="stat-box">
              <span className="label">BPM</span>
              <span className="value">{data.bpm}</span>
            </div>
            <div className="stat-box">
              <span className="label">Key</span>
              <span className="value">{data.key}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App