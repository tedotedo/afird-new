'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface NutritionDataPoint {
  date: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sugar?: number;
  [key: string]: any;
}

interface NutritionTrendChartProps {
  data: NutritionDataPoint[];
  metrics: {
    key: string;
    label: string;
    color: string;
    unit?: string;
  }[];
  title: string;
  showLegend?: boolean;
}

export function NutritionTrendChart({
  data,
  metrics,
  title,
  showLegend = true,
}: NutritionTrendChartProps) {
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
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            {payload[0].payload.fullDate}
          </p>
          {payload.map((entry: any, index: number) => {
            const metric = metrics.find(m => m.key === entry.dataKey);
            return (
              <div key={index} className="flex justify-between items-center gap-3 text-sm">
                <span style={{ color: entry.color }} className="font-medium">
                  {metric?.label}:
                </span>
                <span className="text-gray-700">
                  {entry.value.toFixed(1)} {metric?.unit || ''}
                </span>
              </div>
            );
          })}
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
          />
          <Tooltip content={<CustomTooltip />} />
          {showLegend && (
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
          )}
          {metrics.map((metric) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              name={metric.label}
              stroke={metric.color}
              strokeWidth={2}
              dot={{ fill: metric.color, r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      {/* Average Summary */}
      <div className={`mt-4 grid gap-4 pt-4 border-t border-gray-200`}
           style={{ gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, minmax(0, 1fr))` }}>
        {metrics.map((metric) => {
          const values = data.map(d => d[metric.key] || 0).filter(v => v > 0);
          const average = values.length > 0
            ? values.reduce((a, b) => a + b, 0) / values.length
            : 0;
          
          return (
            <div key={metric.key} className="text-center">
              <p className="text-xs text-gray-600">{metric.label} Avg</p>
              <p className="text-sm font-semibold" style={{ color: metric.color }}>
                {average.toFixed(1)} {metric.unit || ''}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}


