'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface GrowthDataPoint {
  date: string;
  [key: string]: any;
}

interface GrowthTrendChartProps {
  data: GrowthDataPoint[];
  metric: string;
  title: string;
  color?: string;
  unit: string;
}

export function GrowthTrendChart({
  data,
  metric,
  title,
  color = '#3b82f6',
  unit,
}: GrowthTrendChartProps) {
  // Format data for chart
  const chartData = data.map((point) => ({
    ...point,
    displayDate: format(new Date(point.date), 'MMM d'),
    fullDate: format(new Date(point.date), 'PPP'),
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-semibold text-gray-900">
            {payload[0].payload.fullDate}
          </p>
          <p className="text-sm text-gray-700 mt-1">
            <span className="font-medium">{title}:</span>{' '}
            <span style={{ color }}>{payload[0].value.toFixed(1)} {unit}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <p>No data available for this period</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="displayDate"
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#9ca3af' }}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#9ca3af' }}
            label={{ value: unit, angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey={metric}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Stats Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-600">First</p>
          <p className="text-sm font-semibold text-gray-900">
            {data[0][metric]?.toFixed(1)} {unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Latest</p>
          <p className="text-sm font-semibold text-gray-900">
            {data[data.length - 1][metric]?.toFixed(1)} {unit}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">Change</p>
          <p className={`text-sm font-semibold ${
            (data[data.length - 1][metric]! - data[0][metric]!) > 0
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {((data[data.length - 1][metric]! - data[0][metric]!) > 0 ? '+' : '')}
            {(data[data.length - 1][metric]! - data[0][metric]!).toFixed(1)} {unit}
          </p>
        </div>
      </div>
    </div>
  );
}

