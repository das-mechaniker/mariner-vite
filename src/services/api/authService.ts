import { BaseApiService } from './base';
import { AuthResponse, User } from '../../types/api';

export class AuthService extends BaseApiService {
  private readonly storageKey = 'mariner_auth';

  /**
   * Login user with email and password
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('auth/local', {
      identifier: email,
      password,
    });

    if (response.data) {
      this.setToken(response.data.accessToken);
      this.saveAuthToStorage(response.data);
    }

    return response.data;
  }

  /**
   * Register a new user
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const response = await this.post<AuthResponse>('auth/local/register', userData);

    if (response.data) {
      this.setToken(response.data.accessToken);
      this.saveAuthToStorage(response.data);
    }

    return response.data;
  }

  /**
   * Logout current user
   */
  logout(): void {
    this.clearToken();
    localStorage.removeItem(this.storageKey);
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    const auth = this.getAuthFromStorage();
    
    if (!auth) {
      return null;
    }

    try {
      const response = await this.get<User>('users/me');
      return response.data;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  /**
   * Initialize auth from storage
   */
  initAuth(): void {
    const auth = this.getAuthFromStorage();
    
    if (auth) {
      this.setToken(auth.accessToken);
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<AuthResponse> {
    const auth = this.getAuthFromStorage();
    
    if (!auth) {
      throw new Error('No refresh token available');
    }

    const response = await this.post<AuthResponse>('auth/refresh-token', {
      refreshToken: auth.refreshToken,
    });

    if (response.data) {
      this.setToken(response.data.accessToken);
      this.saveAuthToStorage(response.data);
    }

    return response.data;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getAuthFromStorage();
  }

  /**
   * Save auth data to local storage
   */
  private saveAuthToStorage(auth: AuthResponse): void {
    localStorage.setItem(this.storageKey, JSON.stringify(auth));
  }

  /**
   * Get auth data from local storage
   */
  private getAuthFromStorage(): AuthResponse | null {
    const authStr = localStorage.getItem(this.storageKey);
    if (!authStr) {
      return null;
    }

    try {
      return JSON.parse(authStr) as AuthResponse;
    } catch (error) {
      console.error('Failed to parse auth data from storage', error);
      return null;
    }
  }
}

// Export a singleton instance
export const authService = new AuthService(); 