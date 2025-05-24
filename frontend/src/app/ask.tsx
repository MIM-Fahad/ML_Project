"use client";
import React, { useState } from "react";

export default function AskPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/ask?q=${encodeURIComponent(input)}`);
      const data = await res.json();
      if (res.ok) setResult(data.prediction);
      else setError(data.detail || "Error during prediction.");
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-200">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center">
        <div className="bg-green-500 rounded-full p-4 mb-4 shadow-lg">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6a2 2 0 002-2V8a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-green-700 text-opacity-90">Ask the Model</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter comma-separated values"
            className="border border-green-200 rounded px-3 py-2 w-full mb-4 text-green-900 text-opacity-90"
          />
          <button
            type="submit"
            className="bg-green-600 text-white text-opacity-90 px-6 py-2 rounded font-semibold hover:bg-green-700 transition w-full"
            disabled={!input || loading}
          >
            {loading ? "Predicting..." : "Ask"}
          </button>
        </form>
        {result && <div className="mt-4 text-green-700 font-semibold text-opacity-90">Prediction: {result}</div>}
        {error && <div className="mt-4 text-red-700 font-semibold text-opacity-90">{error}</div>}
      </div>
    </div>
  );
}
