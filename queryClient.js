import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

/**
 * Throws an error if the response is not ok
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    let errorMsg;
    try {
      const errData = await res.json();
      errorMsg = errData.message || `HTTP error ${res.status}`;
    } catch (e) {
      errorMsg = `HTTP error ${res.status}`;
    }
    const error = new Error(errorMsg);
    error.status = res.status;
    throw error;
  }
}

/**
 * Makes an API request with the specified method and data
 */
export async function apiRequest(method, endpoint, data = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(endpoint, options);
  await throwIfResNotOk(res);
  return res;
}

/**
 * Creates a query function for TanStack Query
 */
export const getQueryFn = (options = { on401: 'throw' }) => {
  return async ({ queryKey }) => {
    const endpoint = Array.isArray(queryKey) ? queryKey[0] : queryKey;
    
    const res = await fetch(endpoint, {
      credentials: 'include',
    });
    
    if (res.status === 401 && options.on401 === 'returnNull') {
      return null;
    }
    
    await throwIfResNotOk(res);
    return res.json();
  };
};

/**
 * Create and export the query client
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(),
      staleTime: 60 * 1000, // 1 minute
      retry: (failureCount, error) => {
        // Don't retry on 401 or 404
        if (error.status === 401 || error.status === 404) {
          return false;
        }
        return failureCount < 3;
      },
      onError: (error) => {
        // Global error handling for queries
        toast.error(error.message || 'An error occurred');
      },
    },
    mutations: {
      onError: (error) => {
        // Global error handling for mutations
        toast.error(error.message || 'An error occurred');
      },
    },
  },
});