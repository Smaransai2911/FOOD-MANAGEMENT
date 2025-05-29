/**
 * Concatenate class names
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format date to a readable format
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate days until expiry
 */
export function daysUntilExpiry(expiryDate) {
  if (!expiryDate) return 0;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  
  const diffTime = expiry - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Format number with commas
 */
export function formatNumber(num) {
  if (num === undefined || num === null) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get expiry status for UI display
 */
export function getExpiryStatus(expiryDate) {
  const days = daysUntilExpiry(expiryDate);
  
  if (days < 0) {
    return {
      label: 'Expired',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    };
  } else if (days === 0) {
    return {
      label: 'Expires Today',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    };
  } else if (days <= 3) {
    return {
      label: `Expires in ${days} day${days > 1 ? 's' : ''}`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    };
  } else if (days <= 7) {
    return {
      label: `Expires in ${days} days`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    };
  } else {
    return {
      label: `Expires in ${days} days`,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    };
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Generate a random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}