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

/**
 * Calculate age in years from date of birth
 */
export function calculateAge(dateOfBirth: Date | string): number {
  const birthDate = typeof dateOfBirth === 'string' ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust if birthday hasn't occurred yet this year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

