import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Button, Progress, Card } from '@heroui/react';

interface Props {
  onDataParsed: (data: any[]) => void;
}

const XLSXUploader: React.FC<Props> = ({ onDataParsed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setFileName(file.name);

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const reader = new FileReader();

    if (fileExtension === 'csv') {
      reader.onload = () => {
        const csvData = Papa.parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            onDataParsed(result.data);
            setIsLoading(false);
          },
        });
      };
      reader.readAsText(file);
    } else if (fileExtension === 'xlsx') {
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        onDataParsed(jsonData);
        setIsLoading(false);
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Please upload a .csv or .xlsx file');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="file-upload" className="block">
        <div className="relative">
          <input
            id="file-upload"
            type="file"
            accept=".xlsx,.csv"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="hidden"
          />
          <div
            onClick={() => !isLoading && document.getElementById('file-upload')?.click()}
            className={`relative border border-black/15 rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isLoading
                ? 'opacity-50 cursor-not-allowed bg-gray-800/20'
                : 'hover:border-black/25 hover:bg-gray-800/30'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-800/50 rounded-xl border border-black/10">
                <span className="text-4xl">📁</span>
              </div>
              <div>
                <p className="text-gray-100 font-semibold text-lg">
                  {fileName ? `Selected: ${fileName}` : 'Drop your file here or click to upload'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: <span className="text-gray-300 font-medium">CSV, XLSX</span> • Max size: <span className="text-gray-300 font-medium">50MB</span>
                </p>
              </div>
              {isLoading && (
                <div className="w-full mt-6 max-w-md">
                  <Progress
                    isIndeterminate
                    aria-label="Loading..."
                    className="w-full"
                    classNames={{
                      indicator: "bg-gray-600",
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-3 font-medium">Processing file...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};

export default XLSXUploader;
