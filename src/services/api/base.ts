import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface ApiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export class BaseApiService {
  protected baseUrl: string;
  protected headers: Record<string, string>;

  constructor() {
    // In a real environment, this would come from env variables
    this.baseUrl = 'http://localhost:1337/api';
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Set authorization token for API requests
   */
  setToken(token: string): void {
    this.headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authorization token
   */
  clearToken(): void {
    delete this.headers['Authorization'];
  }

  /**
   * Generic method to make API requests
   */
  protected async request<T>(
    method: HttpMethod,
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      headers: this.headers,
      timeout: 5000, // Add a reasonable timeout
      ...(config || {}),
    };

    if (data) {
      if (method === 'GET') {
        axiosConfig.params = data;
      } else {
        axiosConfig.data = data;
      }
    }

    try {
      // Using dynamic import for smaller bundle size
      const { default: axios } = await import('axios');
      const response: AxiosResponse<ApiResponse<T>> = await axios(axiosConfig);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  protected handleError(error: any): never {
    let apiError: ApiError;

    // Handle Axios errors
    if (error.isAxiosError) {
      const axiosError = error as AxiosError<ApiError>;
      const status = axiosError.response?.status || 500;
      const message = axiosError.response?.data?.message || axiosError.message || 'Unknown error occurred';
      const name = axiosError.response?.data?.name || 'ApiError';
      const details = axiosError.response?.data?.details || {};

      apiError = {
        status,
        name,
        message,
        details,
      };
    } 
    // Handle network errors
    else if (error.name === 'NetworkError' || error.message?.includes('Network Error')) {
      apiError = {
        status: 503,
        name: 'NetworkError',
        message: 'Unable to connect to the server. Please check your connection.',
        details: { error: error.message },
      };
    }
    // Handle timeout errors
    else if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      apiError = {
        status: 504,
        name: 'TimeoutError',
        message: 'The request timed out. Please try again later.',
        details: { error: error.message },
      };
    }
    // Handle other errors
    else {
      apiError = {
        status: 500,
        name: 'UnknownError',
        message: error.message || 'An unexpected error occurred',
        details: { originalError: typeof error === 'object' ? JSON.stringify(error) : String(error) },
      };
    }

    // Log error for debugging with better formatting
    console.error('API Error:', JSON.stringify(apiError, null, 2));

    // Re-throw for handling in components
    throw apiError;
  }

  /**
   * GET request wrapper
   */
  protected async get<T>(endpoint: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint, params, config);
  }

  /**
   * POST request wrapper
   */
  protected async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, data, config);
  }

  /**
   * PUT request wrapper
   */
  protected async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, data, config);
  }

  /**
   * DELETE request wrapper
   */
  protected async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint, undefined, config);
  }
} 