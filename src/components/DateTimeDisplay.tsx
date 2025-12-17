import React from 'react';
import { formatDateTime, formatRelativeTime } from '@/utils/dateUtils';

interface DateTimeDisplayProps {
  dateTime: Date;
}

export default function DateTimeDisplay({ dateTime }: DateTimeDisplayProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 mb-5 text-center shadow">
      <p className="text-lg font-semibold text-gray-800">{formatDateTime(dateTime)}</p>
      <p className="text-sm text-gray-600 mt-1">{formatRelativeTime(dateTime)}</p>
    </div>
  );
}
