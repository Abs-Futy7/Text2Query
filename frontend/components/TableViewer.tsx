// components/TableViewer.tsx
import React from "react";

type TableViewerProps = {
  rows: any[];
};

export default function TableViewer({ rows }: TableViewerProps) {
  if (!rows || rows.length === 0) {
    return <div className="mt-2 text-gray-600">No results.</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="overflow-auto mt-3">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="border border-gray-300 p-1 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((c) => {
                const val: unknown = row[c];
                return (
                  <td key={c} className="border border-gray-300 p-1">
                    {String(val === null || val === undefined ? "" : val)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
