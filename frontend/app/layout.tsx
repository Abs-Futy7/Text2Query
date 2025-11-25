// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Text-to-SQL",
  description: "Upload CSV and ask questions in natural language",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen font-['Inter']">
          <div className="mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
