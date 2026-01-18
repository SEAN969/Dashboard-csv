import React, { useState } from 'react';
import XLSXUploader from './assets/components/XLSXUploader';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import DataTable from './assets/components/DataTable';
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
} from '@heroui/react';

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
  <LineChart data={filteredData}>
    <XAxis dataKey={labelKey} stroke="#F0EADA" />
    <YAxis stroke="#F0EADA" />
    <Tooltip />
    <Legend />
    {valueKeys.map((key, index) => (
      <Line key={key} dataKey={key} stroke={getColor(index)} />
    ))}
  </LineChart>
</ResponsiveContainer>

        );
      case 'Pie':
        return (
         <ResponsiveContainer width="100%" height={400}>
  <PieChart>
    <Pie
      data={filteredData}
      dataKey={valueKeys[0]}
      nameKey={labelKey}
      cx="50%"
      cy="50%"
      outerRadius={150}
      label
    >
      {filteredData.map((_, index) => (
        <Cell key={`cell-${index}`} fill={getColor(index)} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>

        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-black/10">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">Test Data Engine</h1>
          <p className="text-gray-500">Upload and visualize your data with interactive charts and tables</p>
        </div>

        {/* File Upload Card */}
        <Card className="mb-8 bg-gray-900 border border-black/12 rounded-2xl shadow-minimal">
          <CardHeader className="flex gap-3 px-6 py-5 border-b border-black/10">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-gray-100">📁 Import Data</p>
              <p className="text-sm text-gray-400">Upload CSV or XLSX files</p>
            </div>
          </CardHeader>
          <CardBody className="gap-4 px-6 py-5">
            <XLSXUploader onDataParsed={handleParsedData} />
          </CardBody>
        </Card>

        {data.length > 0 && (
          <>
            {/* Controls Section */}
            <Card className="mb-8 bg-gray-900 border border-black/12 rounded-2xl shadow-minimal">
              <CardHeader className="flex gap-3 px-6 py-4 border-b border-black/10">
                <div className="flex flex-col">
                  <p className="text-base font-semibold text-gray-100">⚙️ Filters</p>
                </div>
              </CardHeader>
              <CardBody className="gap-3 px-6 py-4">
                {/* Top row: Chart Type, X Axis, Filter Type */}
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="flex-1 min-w-[150px]">
                    <Select
                      label="Chart"
                      selectedKeys={[chartType]}
                      onChange={(e) => setChartType(e.target.value)}
                      size="sm"
                      className="w-full"
                    >
                      {chartOptions.map((option) => (
                        <SelectItem key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <Select
                      label="X Axis"
                      selectedKeys={[labelKey]}
                      onChange={(e) => setLabelKey(e.target.value)}
                      size="sm"
                      className="w-full"
                    >
                      {Object.keys(data[0]).map((key) => (
                        <SelectItem key={key}>
                          {key}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div className="flex-1 min-w-[140px]">
                    <Select
                      label="Filter"
                      selectedKeys={[filterType]}
                      onChange={(e) => setFilterType(e.target.value as 'All' | 'Min' | 'Max')}
                      size="sm"
                      className="w-full"
                    >
                      {filterOptions.map((option) => (
                        <SelectItem key={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  {/* Stats Badge */}
                  <div className="bg-gray-800 border border-black/15 px-3 py-2 rounded-lg">
                    <p className="text-xs text-gray-400">Records</p>
                    <p className="text-lg font-bold text-gray-100">{filteredData.length}</p>
                  </div>
                </div>

                {/* Bottom row: Y Axis Values as compact filter pills */}
                <div className="flex flex-wrap gap-2 pt-2 items-center">
                  <p className="text-xs font-semibold text-gray-300">Y Axis:</p>
                  {Object.keys(data[0]).map((key) =>
                    key !== labelKey && (
                      <button
                        key={key}
                        onClick={() => setValueKeys((prev) =>
                          prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
                        )}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                          valueKeys.includes(key)
                            ? 'bg-gray-700 border border-gray-600 text-gray-100'
                            : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600'
                        }`}
                      >
                        {key}
                      </button>
                    )
                  )}
                </div>
              </CardBody>
            </Card>

            {/* Chart Section */}
            {valueKeys.length > 0 && (
              <Card className="mb-8 bg-gray-900 border border-black/12 rounded-2xl shadow-minimal">
                <CardHeader className="flex gap-3 px-6 py-5 border-b border-black/10">
                  <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-100">📈 Visualization</p>
                    <p className="text-sm text-gray-400">{chartType} Chart</p>
                  </div>
                </CardHeader>
                <CardBody className="gap-4 px-6 py-5">
                  <div className="w-full bg-black/20 rounded-xl p-6 border border-black/15">
                    {renderChart()}
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Data Table Section */}
            <Card className="bg-gray-900 border border-black/12 rounded-2xl shadow-minimal">
              <CardHeader className="flex gap-3 px-6 py-5 border-b border-black/10">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-100">📋 Data Table</p>
                  <p className="text-sm text-gray-400">View detailed records</p>
                </div>
              </CardHeader>
              <CardBody className="gap-4 px-6 py-5">
                <DataTable data={filteredData} />
              </CardBody>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
