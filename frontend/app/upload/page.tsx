// app/upload/page.tsx
"use client";
import { useState } from "react";
import { uploadCSV } from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a CSV file first.");
      return;
    }
    setStatus("Uploading...");
    const res = await uploadCSV(file);
    if (res.ok) {
      setColumns(res.columns || []);
      setStatus("Uploaded successfully.");
    } else {
      setStatus(`Error: ${res.error || "unknown"}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-black px-4 py-16">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 border border-purple-400/30 flex flex-col items-center relative">
        {/* Back Button */}
        <div className="absolute left-4 top-4">
          <a href="/" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-indigo-300 drop-shadow-lg mb-4 text-center">Upload Your CSV</h2>
        <p className="text-purple-200/80 mb-8 text-center text-lg">Select your CSV file to begin exploring your data with natural language queries.</p>

        <label className="w-full flex flex-col items-center px-4 py-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-dashed border-purple-400/40 rounded-2xl cursor-pointer hover:border-purple-400/80 transition-all duration-200 mb-6">
          <input
            type="file"
            accept=".csv"
            className="hidden"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
          <span className="text-purple-200 text-lg font-medium">
            {file ? file.name : "Click to select a CSV file"}
          </span>
        </label>

        <button
          onClick={handleUpload}
          className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 text-lg mb-4"
        >
          Upload
        </button>

        {status && (
          <p className={`mt-2 text-center text-base font-medium ${status.startsWith("Error") ? "text-red-400" : "text-green-300"}`}>{status}</p>
        )}

        {columns && (
          <div className="mt-6 w-full">
            <h3 className="font-bold text-purple-200 mb-2 text-lg">Detected Columns:</h3>
            <ul className="list-disc list-inside text-purple-100 pl-4">
              {columns.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
