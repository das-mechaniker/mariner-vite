import { BaseApiService } from '../../../services/api/base';

// Mock axios
jest.mock('axios');

// Create a test subclass to expose protected methods
class TestApiService extends BaseApiService {
  public async testGet<T>(endpoint: string, params?: Record<string, any>) {
    return this.get<T>(endpoint, params);
  }
  
  public async testPost<T>(endpoint: string, data?: any) {
    return this.post<T>(endpoint, data);
  }
  
  public async testPut<T>(endpoint: string, data?: any) {
    return this.put<T>(endpoint, data);
  }
  
  public async testDelete<T>(endpoint: string) {
    return this.delete<T>(endpoint);
  }
}

describe('BaseApiService', () => {
  let apiService: TestApiService;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh instance for each test
    apiService = new TestApiService();
  });
  
  it('should make GET requests correctly', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Entity',
            description: 'Test description',
          },
        },
      },
    };
    
    // Setup axios mock for this test
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockResolvedValueOnce(mockResponse);
    
    // Call the method
    const result = await apiService.testGet('/test-endpoint', { 
      'filters[id][$eq]': '1'
    });
    
    // Check result is returned correctly
    expect(result).toEqual(mockResponse.data);
  });
  
  it('should make POST requests correctly', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        data: {
          id: '1',
          attributes: {
            name: 'New Entity',
            description: 'New description',
          },
        },
      },
    };
    
    // Setup axios mock for this test
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockResolvedValueOnce(mockResponse);
    
    // Call the method
    const result = await apiService.testPost('/test-endpoint', { 
      data: { name: 'New Entity', description: 'New description' } 
    });
    
    // Check result is returned correctly
    expect(result).toEqual(mockResponse.data);
  });
  
  it('should make PUT requests correctly', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        data: {
          id: '1',
          attributes: {
            name: 'Updated Entity',
            description: 'Updated description',
          },
        },
      },
    };
    
    // Setup axios mock for this test
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockResolvedValueOnce(mockResponse);
    
    // Call the method
    const result = await apiService.testPut('/test-endpoint/1', { 
      data: { name: 'Updated Entity', description: 'Updated description' } 
    });
    
    // Check result is returned correctly
    expect(result).toEqual(mockResponse.data);
  });
  
  it('should make DELETE requests correctly', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        data: {
          id: '1',
          attributes: {
            name: 'Deleted Entity',
          },
        },
      },
    };
    
    // Setup axios mock for this test
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockResolvedValueOnce(mockResponse);
    
    // Call the method
    const result = await apiService.testDelete('/test-endpoint/1');
    
    // Check result is returned correctly
    expect(result).toEqual(mockResponse.data);
  });
  
  it('should handle API errors correctly', async () => {
    // Mock error response
    const errorResponse = {
      response: {
        status: 400,
        data: {
          name: 'BadRequestError',
          message: 'Invalid request',
          details: { field: 'name', message: 'Name is required' },
        },
      },
    };
    
    // Setup axios mock to throw an error
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockRejectedValueOnce(errorResponse);
    
    // Call the method and expect it to throw
    await expect(apiService.testGet('/test-endpoint'))
      .rejects.toMatchObject({
        status: 400,
        name: 'BadRequestError',
        message: 'Invalid request',
        details: { field: 'name', message: 'Name is required' },
      });
  });
  
  it('should handle non-API errors correctly', async () => {
    // Mock a network error without a response
    const errorWithoutResponse = {
      message: 'Network Error',
    };
    
    // Setup axios mock to throw an error without response
    // @ts-ignore - Mocking module import dynamically
    (await import('axios')).default.mockRejectedValueOnce(errorWithoutResponse);
    
    // Call the method and expect it to throw
    await expect(apiService.testGet('/test-endpoint'))
      .rejects.toMatchObject({
        status: 500,
        name: 'ApiError',
        message: 'Network Error',
        details: {},
      });
  });
}); 