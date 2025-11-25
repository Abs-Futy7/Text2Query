// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-purple-950/20 to-black px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-4xl w-full text-center mb-16">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium backdrop-blur-sm">
            AI-Powered Data Intelligence
          </span>
        </div>
        
        <h1 className="font-extrabold text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-indigo-300 drop-shadow-2xl mb-6 tracking-tight">
          Text2Query
        </h1>
        
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 mb-6 leading-tight">
          Transform Natural Language into SQL
        </h2>
        
        <p className="text-lg md:text-xl text-purple-200/80 max-w-2xl mx-auto leading-relaxed">
          Upload your CSV data and ask questions in plain English. Get instant, accurate SQL queries without writing a single line of code.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/upload" className="w-full sm:w-auto cursor-pointer">
            <button className="cursor-pointer group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 text-lg overflow-hidden">
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload CSV
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          
          <Link href="/query" className="w-full sm:w-auto  cursor-pointer">
            <button className="cursor-pointer group w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-purple-400/30 hover:border-purple-400/60 shadow-lg transition-all duration-300 text-lg">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Query Data
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="max-w-4xl w-full">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">How It Works</h3>
          <p className="text-purple-200/70">Three simple steps to unlock your data insights</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="group relative bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            
            <div className="mt-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-purple-100 mb-2">Upload Your CSV</h4>
              <p className="text-purple-200/70 leading-relaxed">
                Securely upload your dataset and let our system analyze the structure
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
           
            <div className="mt-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-purple-100 mb-2">Ask in Plain English</h4>
              <p className="text-purple-200/70 leading-relaxed">
                Type your question naturally—no technical knowledge required
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative bg-gradient-to-br from-purple-900/20 to-indigo-900/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:-translate-y-1">
            
            <div className="mt-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-purple-100 mb-2">Get Instant SQL</h4>
              <p className="text-purple-200/70 leading-relaxed">
                Receive optimized SQL queries ready to execute or customize
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
