import React, { useState } from 'react';
import XLSXUploader from './assets/components/XLSXUploader';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import DataTable from './assets/components/DataTable';

const chartOptions = ['Bar', 'Line', 'Pie'];
const filterOptions = ['All', 'Min', 'Max'];
const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<string>('Bar');
  const [labelKey, setLabelKey] = useState('');
  const [valueKeys, setValueKeys] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'All' | 'Min' | 'Max'>('All');

function handleParsedData(parsedData: any[]): void {
  if (!parsedData || parsedData.length === 0) return;

  const sanitizedData = parsedData.map((row) => {
    const newRow: any = { ...row };
    for (const key in newRow) {
      if (typeof newRow[key] === 'string' && newRow[key].includes('Mbps')) {
        newRow[key] = parseFloat(newRow[key].replace('Mbps', '').trim());
      }
    }
    return newRow;
  });

  const keys = Object.keys(sanitizedData[0]);
  setData(sanitizedData);
  setLabelKey(keys[0]);
  setValueKeys(keys.slice(1));
}


  // Filtering logic
  const getFilteredData = () => {
    if (filterType === 'All' || valueKeys.length === 0) return data;

    return valueKeys.map((key) => {
      const values = data.map((item) => item[key]);
      const targetValue = filterType === 'Min' ? Math.min(...values) : Math.max(...values);
      return data.find((item) => item[key] === targetValue);
    }).filter(Boolean);
  };

  const filteredData = getFilteredData();


// Utility to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 })
    .map(() => letters[Math.floor(Math.random() * 16)])
    .join('');
};

const getColor = (index: number) => {
  if (valueKeys.length === 1) {
    return getRandomColor(); // One metric? Use random color.
  }
  return COLORS[index % COLORS.length]; // Multiple metrics? Use predefined colors.
};

  
  const renderChart = () => {
    if (!labelKey || valueKeys.length === 0) return null;

    switch (chartType) {
      case 'Bar':
        return (
       <ResponsiveContainer width="100%" height={400}>
  <BarChart data={filteredData}>
    <XAxis dataKey={labelKey} stroke="#F0EADA" />
    <YAxis stroke="#F0EADA" />
    <Tooltip />
    <Legend />
    {valueKeys.map((key, index) => (
<Bar key={key} dataKey={key} fill={getColor(index)} />
    ))}
  </BarChart>
</ResponsiveContainer>

        );
      case 'Line':
        return (
        <ResponsiveContainer width="100%" height={400}>
  <BarChart data={filteredData}>
    <XAxis dataKey={labelKey} stroke="#F0EADA" />
    <YAxis stroke="#F0EADA" />
    <Tooltip />
    <Legend />
    {valueKeys.map((key, index) => (
      <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
    ))}
  </BarChart>
</ResponsiveContainer>

        );
      case 'Pie':
        return (
         <ResponsiveContainer width="100%" height={400}>
  <BarChart data={filteredData}>
    <XAxis dataKey={labelKey} stroke="#F0EADA" />
    <YAxis stroke="#F0EADA" />
    <Tooltip />
    <Legend />
    {valueKeys.map((key, index) => (
      <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
    ))}
  </BarChart>
</ResponsiveContainer>

        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Advanced Excel Dashboard</h1>

      <XLSXUploader onDataParsed={handleParsedData} />

      {data.length > 0 && (
        <>
          <div className="my-6 flex flex-wrap gap-6 items-start">
            {/* Chart Type Selector */}
            <div>
              <label className="block font-medium mb-1">Chart Type:</label>
              <select
                className="border rounded px-2 py-1"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                {chartOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Label Key Selector */}
            <div>
              <label className="block font-medium mb-1">X Axis (Label):</label>
              <select
                className="border rounded px-2 py-1"
                value={labelKey}
                onChange={(e) => setLabelKey(e.target.value)}
              >
                {Object.keys(data[0]).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
            </div>

            {/* Value Key Selector */}
            <div>
              <label className="block font-medium mb-1">Y Axis (Values):</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(data[0]).map((key) =>
                  key !== labelKey && (
                    <label key={key} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        value={key}
                        checked={valueKeys.includes(key)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setValueKeys((prev) =>
                            e.target.checked
                              ? [...prev, value]
                              : prev.filter((k) => k !== value)
                          );
                        }}
                      />
                      {key}
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Min/Max Filter */}
            <div>
              <label className="block font-medium mb-1">Filter by:</label>
              <select
                className="border rounded px-2 py-1"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'All' | 'Min' | 'Max')}
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 mb-6">
            {renderChart()}
          </div>

          <div className="mt-10">
            <DataTable data={filteredData} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
