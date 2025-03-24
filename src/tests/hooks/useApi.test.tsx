/** @jsxImportSource react */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useApi, useApiGet, useApiQuery, useApiMutation } from '../../hooks/useApi';
import { ApiError } from '../../services/api/base';

describe('useApi hooks', () => {
  // Basic useApi hook tests
  describe('useApi', () => {
    it('should handle successful API calls', async () => {
      // Mock API function that resolves successfully
      const mockApiFunction = jest.fn().mockResolvedValue({ id: 1, name: 'Test Data' });
      
      // Render the hook
      const { result } = renderHook(() => useApi(mockApiFunction));
      
      // Initial state should have isLoading: false and data: null
      expect(result.current[0]).toEqual({
        data: null,
        isLoading: false,
        error: null,
        isSuccess: false,
      });
      
      // Execute the API call
      let response;
      await act(async () => {
        response = await result.current[1]();
      });
      
      // Check the response from execute function
      expect(response).toEqual({ id: 1, name: 'Test Data' });
      
      // Check the updated state
      expect(result.current[0]).toEqual({
        data: { id: 1, name: 'Test Data' },
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      
      // Verify the API function was called
      expect(mockApiFunction).toHaveBeenCalledTimes(1);
    });
    
    it('should handle API errors', async () => {
      // Mock error to be thrown
      const apiError: ApiError = {
        status: 404,
        name: 'NotFoundError',
        message: 'Resource not found',
        details: {},
      };
      
      // Mock API function that rejects with an error
      const mockApiFunction = jest.fn().mockRejectedValue(apiError);
      
      // Render the hook
      const { result } = renderHook(() => useApi(mockApiFunction));
      
      // Execute the API call and expect it to throw
      await act(async () => {
        try {
          await result.current[1]();
          // If we reach here, the test should fail
          expect(true).toBe(false);
        } catch (error) {
          // Verify the thrown error
          expect(error).toEqual(apiError);
        }
      });
      
      // Check the updated state
      expect(result.current[0]).toEqual({
        data: null,
        isLoading: false,
        error: apiError,
        isSuccess: false,
      });
    });
    
    it('should set isLoading during API call', async () => {
      // Mock API function with a delay to check loading state
      const mockApiFunction = jest.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve({ id: 1, name: 'Test Data' }), 100);
        });
      });
      
      // Render the hook
      const { result } = renderHook(() => useApi(mockApiFunction));
      
      // Start the API call but don't await it yet
      let promise: Promise<any>;
      act(() => {
        promise = result.current[1]();
      });
      
      // Check that isLoading is true during the call
      expect(result.current[0].isLoading).toBe(true);
      
      // Wait for the call to complete
      await act(async () => {
        await promise;
      });
      
      // Check that isLoading is false after the call
      expect(result.current[0].isLoading).toBe(false);
      expect(result.current[0].isSuccess).toBe(true);
    });
    
    it('should reset state correctly', async () => {
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue({ id: 1, name: 'Test Data' });
      
      // Render the hook
      const { result } = renderHook(() => useApi(mockApiFunction));
      
      // Execute the API call
      await act(async () => {
        await result.current[1]();
      });
      
      // Check the updated state before reset
      expect(result.current[0]).toEqual({
        data: { id: 1, name: 'Test Data' },
        isLoading: false,
        error: null,
        isSuccess: true,
      });
      
      // Reset the state
      act(() => {
        result.current[2]();
      });
      
      // Check state after reset
      expect(result.current[0]).toEqual({
        data: null,
        isLoading: false,
        error: null,
        isSuccess: false,
      });
    });
  });
  
  // useApiGet hook tests
  describe('useApiGet', () => {
    it('should fetch data immediately when enabled', async () => {
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue({ id: 1, name: 'Test Data' });
      
      // Render the hook with enabled=true
      const { result } = renderHook(() => useApiGet(mockApiFunction, true));
      
      // Initial state should have isLoading: true
      expect(result.current.isLoading).toBe(true);
      
      // Wait for the data to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Check the final state
      expect(result.current.data).toEqual({ id: 1, name: 'Test Data' });
      expect(result.current.isSuccess).toBe(true);
      
      // Verify the API function was called
      expect(mockApiFunction).toHaveBeenCalledTimes(1);
    });
    
    it('should not fetch data when disabled', async () => {
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue({ id: 1, name: 'Test Data' });
      
      // Render the hook with enabled=false
      renderHook(() => useApiGet(mockApiFunction, false));
      
      // Verify the API function was not called
      expect(mockApiFunction).not.toHaveBeenCalled();
    });
    
    it('should refetch data when refetch is called', async () => {
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue({ id: 1, name: 'Test Data' });
      
      // Render the hook
      const { result } = renderHook(() => useApiGet(mockApiFunction, false));
      
      // Call refetch
      await act(async () => {
        await result.current.refetch();
      });
      
      // Verify the API function was called once
      expect(mockApiFunction).toHaveBeenCalledTimes(1);
      
      // Call refetch again
      await act(async () => {
        await result.current.refetch();
      });
      
      // Verify the API function was called twice
      expect(mockApiFunction).toHaveBeenCalledTimes(2);
    });
  });
  
  // Additional tests for useApiQuery and useApiMutation
  describe('useApiQuery', () => {
    it('should call onSuccess when query succeeds', async () => {
      // Mock success callback
      const onSuccess = jest.fn();
      
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
      
      // Render the hook with onSuccess handler
      const { result } = renderHook(() => 
        useApiQuery(mockApiFunction, { onSuccess })
      );
      
      // Wait for data to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Verify onSuccess was called with the data
      expect(onSuccess).toHaveBeenCalledWith([
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ]);
    });
    
    it('should call onError when query fails', async () => {
      // Mock error
      const apiError: ApiError = {
        status: 500,
        name: 'ServerError',
        message: 'Internal server error',
        details: {},
      };
      
      // Mock error callback
      const onError = jest.fn();
      
      // Mock API function that fails
      const mockApiFunction = jest.fn().mockRejectedValue(apiError);
      
      // Render the hook with onError handler
      const { result } = renderHook(() => 
        useApiQuery(mockApiFunction, { onError })
      );
      
      // Wait for error to be processed
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Verify onError was called with the error
      expect(onError).toHaveBeenCalledWith(apiError);
      
      // Verify the error is exposed in the result
      expect(result.current.error).toEqual(apiError);
    });
  });
  
  describe('useApiMutation', () => {
    it('should call onSuccess when mutation succeeds', async () => {
      // Mock success callback
      const onSuccess = jest.fn();
      
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue(
        { id: 1, name: 'Created Item' }
      );
      
      // Render the hook with onSuccess handler
      const { result } = renderHook(() => 
        useApiMutation(mockApiFunction, { onSuccess })
      );
      
      // Execute the mutation
      await act(async () => {
        await result.current.mutate({ name: 'New Item' });
      });
      
      // Verify the mutation function was called with the input
      expect(mockApiFunction).toHaveBeenCalledWith({ name: 'New Item' });
      
      // Verify onSuccess was called with the result
      expect(onSuccess).toHaveBeenCalledWith({ id: 1, name: 'Created Item' });
      
      // Verify the result is exposed
      expect(result.current.data).toEqual({ id: 1, name: 'Created Item' });
      expect(result.current.isLoading).toBe(false);
    });
    
    it('should reset state when reset is called', async () => {
      // Mock API function
      const mockApiFunction = jest.fn().mockResolvedValue(
        { id: 1, name: 'Created Item' }
      );
      
      // Render the hook
      const { result } = renderHook(() => useApiMutation(mockApiFunction));
      
      // Execute the mutation
      await act(async () => {
        await result.current.mutate({ name: 'New Item' });
      });
      
      // Verify we have data
      expect(result.current.data).toEqual({ id: 1, name: 'Created Item' });
      
      // Reset the state
      act(() => {
        result.current.reset();
      });
      
      // Verify state is reset
      expect(result.current.data).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
}); 