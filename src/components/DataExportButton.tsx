'use client';

import { useState } from 'react';

interface DataExportButtonProps {
  format?: 'json' | 'csv';
  onExport?: () => void;
}

export default function DataExportButton({ 
  format = 'json',
  onExport 
}: DataExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/export-data?format=${format}`);
      if (!response.ok) {
        throw new Error('Failed to export data');
      }

      let blob: Blob;
      if (format === 'json') {
        const jsonData = await response.json();
        blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      } else {
        blob = await response.blob();
      }
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `food-entries-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      if (onExport) {
        onExport();
      }
    } catch (error: any) {
      alert(`Failed to export data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition shadow-lg disabled:cursor-not-allowed"
    >
      {loading ? 'Exporting...' : `Download as ${format.toUpperCase()}`}
    </button>
  );
}

