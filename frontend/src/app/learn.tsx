"use client";
import React, { useState } from "react";

export default function LearnPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("csv_file", file);
    try {
      const res = await fetch("http://localhost:8000/learn", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) setMessage(data.message);
      else setMessage(data.detail || "Error during training.");
    } catch (err) {
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200">
      <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-lg flex flex-col items-center">
        <div className="bg-blue-500 rounded-full p-4 mb-4 shadow-lg">
          <svg
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          Upload CSV to Train Model
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center"
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="mb-4 border border-blue-200 rounded px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition w-full"
            disabled={!file || loading}
          >
            {loading ? "Training..." : "Train Model"}
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-700 font-semibold">{message}</div>
        )}
      </div>
    </div>
  );
}
