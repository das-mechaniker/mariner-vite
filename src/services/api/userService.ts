import { BaseApiService, ApiResponse } from './base';
import { User, normalizeStrapiCollection, normalizeStrapiEntity } from '../../types/api';

export class UserService extends BaseApiService {
  private readonly endpoint = 'users';

  /**
   * Get all users
   */
  async getUsers(query?: Record<string, any>): Promise<User[]> {
    const response = await this.get<any>(this.endpoint, query);
    return normalizeStrapiCollection<User>(response);
  }

  /**
   * Get a user by ID
   */
  async getUserById(id: string): Promise<User> {
    const response = await this.get<any>(`${this.endpoint}/${id}`);
    return normalizeStrapiEntity<User>(response);
  }

  /**
   * Get the current user (based on auth token)
   */
  async getCurrentUser(): Promise<User> {
    const response = await this.get<any>('users/me');
    return response.data;
  }

  /**
   * Create a new user
   */
  async createUser(userData: Partial<User>): Promise<User> {
    const response = await this.post<any>(this.endpoint, { data: userData });
    return normalizeStrapiEntity<User>(response);
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, { data: userData });
    return normalizeStrapiEntity<User>(response);
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<void> {
    await this.delete(`${this.endpoint}/${id}`);
  }
}

// Export a singleton instance
export const userService = new UserService(); 