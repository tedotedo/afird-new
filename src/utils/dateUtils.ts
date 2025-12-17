import { format, formatDistanceToNow } from 'date-fns';

export function formatDateTime(date: Date): string {
  return format(date, 'PPp');
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatTime(date: Date): string {
  return format(date, 'p');
}

export function formatDate(date: Date): string {
  return format(date, 'PP');
}

