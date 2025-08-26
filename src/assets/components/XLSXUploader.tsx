import React from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

interface Props {
  onDataParsed: (data: any[]) => void;
}

const XLSXUploader: React.FC<Props> = ({ onDataParsed }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    const reader = new FileReader();

    if (fileExtension === 'csv') {
      reader.onload = () => {
        const csvData = Papa.parse(reader.result as string, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            onDataParsed(result.data);
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
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Please upload a .csv or .xlsx file');
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={handleFileUpload}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0
                   file:text-sm file:font-semibold
                   file:bg-indigo-50 file:text-indigo-700
                   hover:file:bg-indigo-100"
      />
    </div>
  );
};

export default XLSXUploader;
