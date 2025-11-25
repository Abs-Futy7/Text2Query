// app/query/page.tsx
"use client";
import { useState } from "react";
import { askQuestion } from "@/lib/api";
import TableViewer from "@/components/TableViewer";

export default function QueryPage() {
  const [q, setQ] = useState("");
  const [sql, setSql] = useState<string | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await askQuestion(q);
      if (!res.ok) {
        setError(res.error || "Unknown error");
      } else {
        setSql(res.sql || null);
        setRows(res.results || []);
      }
    } catch (e: any) {
      setError(e.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-black px-4 py-16">
      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-14 border border-purple-400/30 flex flex-col items-center relative">
        {/* Back Button */}
        <div className="absolute left-4 top-4">
          <a href="/" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </a>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-indigo-300 drop-shadow-lg mb-4 text-center">Ask a Question</h2>
        <p className="text-purple-200/80 mb-8 text-center text-lg">Type your question in plain English to generate an instant SQL query and see your data results.</p>
        <textarea
          value={q}
          onChange={(e) => setQ(e.target.value)}
          rows={4}
          className="w-full border-2 border-purple-400/40 focus:border-purple-400/80 bg-black/30 text-white p-3 mt-3 rounded-xl outline-none transition-all duration-200 placeholder-purple-300/60"
          placeholder="e.g., Show all students with marks > 80"
        />
        <button
          onClick={run}
          disabled={loading}
          className="w-full mt-4 px-8 py-4 bg-gradient-to-r from-green-500 to-purple-500 hover:from-green-400 hover:to-purple-600 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 text-lg disabled:opacity-60"
        >
          {loading ? "Thinking..." : "Run"}
        </button>

        {sql && (
          <div className="mt-6 w-full">
            <h3 className="font-bold text-purple-200 mb-2 text-lg">Generated SQL</h3>
            <pre className="bg-black/40 text-purple-100 p-4 rounded-xl whitespace-pre-wrap break-words border border-purple-400/20">{sql}</pre>
          </div>
        )}

        {error && (
          <div className="mt-6 w-full text-red-400 bg-red-900/20 border border-red-400/30 rounded-xl p-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="mt-6 w-full">
          <TableViewer rows={rows} />
        </div>
      </div>
    </div>
  );
}
