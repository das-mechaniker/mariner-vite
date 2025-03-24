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
      return this.handleError(error as AxiosError<ApiError>);
    }
  }

  /**
   * Handle API errors
   */
  protected handleError(error: AxiosError<ApiError>): never {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'Unknown error occurred';
    const name = error.response?.data?.name || 'ApiError';
    const details = error.response?.data?.details || {};

    const apiError: ApiError = {
      status,
      name,
      message,
      details,
    };

    // Log error for debugging
    console.error('API Error:', apiError);

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