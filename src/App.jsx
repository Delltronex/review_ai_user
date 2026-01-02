import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const submitFeedback = async () => {
    setError("");
    setAiResponse("");
    setSuccessMsg("");

    try {
      const response = await axios.post(
        "https://review-ai-backend-iota.vercel.app/",
        { rating, review }
      );

      setAiResponse(response.data.ai_response);

      // ✅ Success alert
      setSuccessMsg("✅ Feedback submitted successfully!");

      // Optional: clear form
      setReview("");

      // Auto-hide alert after 3 seconds
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);

    } catch (err) {
      setError("❌ Backend error. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>⭐ Share Your Feedback</h2>
      <p className="subtitle">Your feedback helps us improve!</p>

      {successMsg && <div className="alert-success">{successMsg}</div>}
      {error && <div className="alert-error">{error}</div>}

      <label className="label">
        Rating: <b>{rating}</b>
      </label>

      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="slider"
      />

      <textarea
        className="textarea"
        placeholder="Write your review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button className="button" onClick={submitFeedback}>
        Submit
      </button>

      {aiResponse && (
        <div className="success">
          <strong>AI Response:</strong>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
