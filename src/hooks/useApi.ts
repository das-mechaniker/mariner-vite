import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/api/base';

/**
 * Defines the possible status of an API request
 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Represents the state of an API request
 */
export type ApiState<T> = {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  isSuccess: boolean;
  status: ApiStatus;
  statusCode?: number;
  errorMessage?: string;
};

/**
 * Type for an API function that takes parameters and returns a Promise
 */
export type ApiFunction<T, P extends any[]> = (...args: P) => Promise<T>;

/**
 * Enhanced hook for handling API requests with better error handling
 * 
 * @param apiFunction - The API function to call
 * @param immediate - Whether to call the API immediately
 * @param initialArgs - Initial arguments for immediate call
 * @returns [state, execute, reset]
 */
export function useApi<T, P extends any[] = []>(
  apiFunction: ApiFunction<T, P>,
  immediate = false,
  initialArgs?: P
): [
  ApiState<T>,
  (...args: P) => Promise<T>,
  () => void
] {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
    isSuccess: false,
    status: immediate ? 'loading' : 'idle',
  });

  const execute = useCallback(
    async (...args: P): Promise<T> => {
      try {
        setState((prevState) => ({
          ...prevState,
          isLoading: true,
          error: null,
          status: 'loading',
          statusCode: undefined,
          errorMessage: undefined,
        }));

        const data = await apiFunction(...args);

        setState({
          data,
          isLoading: false,
          error: null,
          isSuccess: true,
          status: 'success',
        });

        return data;
      } catch (error) {
        const apiError = error as ApiError;
        setState({
          data: null,
          isLoading: false,
          error: apiError,
          isSuccess: false,
          status: 'error',
          statusCode: apiError.status,
          errorMessage: apiError.message,
        });
        throw error;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      isLoading: false,
      error: null,
      isSuccess: false,
      status: 'idle',
      statusCode: undefined,
      errorMessage: undefined,
    });
  }, []);

  useEffect(() => {
    if (immediate && initialArgs) {
      execute(...initialArgs).catch(() => {
        // Error is already handled in the execute function
      });
    }
  }, [execute, immediate, initialArgs]);

  return [state, execute, reset];
}

/**
 * Hook for handling GET requests with automatic fetching
 * 
 * @param apiFunction - The API function to call
 * @param enabled - Whether to enable automatic fetching
 * @returns state and refetch function
 */
export function useApiGet<T>(
  apiFunction: () => Promise<T>,
  enabled = true
): ApiState<T> & {
  refetch: () => Promise<T>;
} {
  const [{ data, isLoading, error, isSuccess, status, statusCode, errorMessage }, execute] = useApi<T>(
    apiFunction,
    enabled
  );

  const refetch = useCallback(() => {
    return execute();
  }, [execute]);

  return {
    data,
    isLoading,
    error,
    isSuccess,
    status,
    statusCode,
    errorMessage,
    refetch,
  };
}

/**
 * Hook for handling mutation operations (POST, PUT, DELETE)
 * 
 * @param apiFunction - The API function to call
 * @returns state and mutate function
 */
export function useApiMutation<T, P extends any[] = []>(
  apiFunction: ApiFunction<T, P>
): ApiState<T> & {
  mutate: (...args: P) => Promise<T>;
  reset: () => void;
} {
  const [state, execute, reset] = useApi<T, P>(apiFunction, false);

  return {
    ...state,
    mutate: execute,
    reset,
  };
}

/**
 * Hook for handling paginated API requests with automatic loading of next pages
 * 
 * @param getFunction - Function to fetch a page of data
 * @param pageParam - Parameter name for the page number
 * @param initialPage - Starting page number
 * @returns Paginated state and control functions
 */
export function useApiPagination<T, P extends object = {}>(
  getFunction: (params: P & { page: number; pageSize: number }) => Promise<{
    data: T[];
    meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
  }>,
  pageParam: P = {} as P,
  initialPage = 1,
  pageSize = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [pageCount, setPageCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const params = {
    ...pageParam,
    page,
    pageSize,
  } as P & { page: number; pageSize: number };

  const [{ isLoading, error, status }, fetchPage] = useApi(
    getFunction,
    true,
    [params] as any
  );

  const loadNextPage = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    try {
      const response = await fetchPage({
        ...pageParam,
        page: page + 1,
        pageSize,
      } as any);

      const newItems = response.data;
      setData((prev) => [...prev, ...newItems]);
      setPage((prev) => prev + 1);
      setHasMore(page + 1 < response.meta.pagination.pageCount);
      setPageCount(response.meta.pagination.pageCount);
      setTotal(response.meta.pagination.total);
    } catch (error) {
      console.error('Error loading next page:', error);
    }
  }, [fetchPage, hasMore, isLoading, page, pageParam, pageSize]);

  const refresh = useCallback(async () => {
    setPage(initialPage);
    setData([]);
    setHasMore(true);
    
    try {
      const response = await fetchPage({
        ...pageParam,
        page: initialPage,
        pageSize,
      } as any);

      setData(response.data);
      setPage(initialPage);
      setHasMore(initialPage < response.meta.pagination.pageCount);
      setPageCount(response.meta.pagination.pageCount);
      setTotal(response.meta.pagination.total);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
  }, [fetchPage, initialPage, pageParam, pageSize]);

  return {
    data,
    isLoading,
    error,
    status,
    page,
    pageCount,
    total,
    hasMore,
    loadNextPage,
    refresh,
  };
}

// Query hook for multiple items
export function useApiQuery<T>(
  queryFn: () => Promise<T[]>,
  options: {
    enabled?: boolean;
    onSuccess?: (data: T[]) => void;
    onError?: (error: ApiError) => void;
  } = {}
): {
  data: T[] | null;
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => Promise<T[]>;
} {
  const { enabled = true, onSuccess, onError } = options;
  const [state, execute] = useApi<T[]>(queryFn, enabled);

  const refetch = useCallback(async () => {
    try {
      const data = await execute();
      if (onSuccess) onSuccess(data);
      return data;
    } catch (error) {
      if (onError) onError(error as ApiError);
      throw error;
    }
  }, [execute, onSuccess, onError]);

  useEffect(() => {
    if (state.isSuccess && onSuccess && state.data) {
      onSuccess(state.data);
    }
  }, [state.isSuccess, state.data, onSuccess]);

  useEffect(() => {
    if (state.error && onError) {
      onError(state.error);
    }
  }, [state.error, onError]);

  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
    refetch,
  };
} 