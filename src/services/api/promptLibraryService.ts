import { BaseApiService } from './base';
import { Prompt, normalizeStrapiCollection, normalizeStrapiEntity } from '../../types/api';

export class PromptLibraryService extends BaseApiService {
  private readonly endpoint = 'prompts';

  /**
   * Get all prompts
   */
  async getPrompts(query?: Record<string, any>): Promise<Prompt[]> {
    const response = await this.get<any>(this.endpoint, {
      sort: 'updatedAt:desc',
      ...query,
    });
    return normalizeStrapiCollection<Prompt>(response);
  }

  /**
   * Get a prompt by ID
   */
  async getPromptById(id: string): Promise<Prompt> {
    const response = await this.get<any>(`${this.endpoint}/${id}`);
    return normalizeStrapiEntity<Prompt>(response);
  }

  /**
   * Get prompts by category
   */
  async getPromptsByCategory(category: string): Promise<Prompt[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: { category },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<Prompt>(response);
  }

  /**
   * Create a new prompt
   */
  async createPrompt(promptData: Partial<Prompt>): Promise<Prompt> {
    const response = await this.post<any>(this.endpoint, { data: promptData });
    return normalizeStrapiEntity<Prompt>(response);
  }

  /**
   * Update an existing prompt
   */
  async updatePrompt(id: string, promptData: Partial<Prompt>): Promise<Prompt> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, { data: promptData });
    return normalizeStrapiEntity<Prompt>(response);
  }

  /**
   * Delete a prompt
   */
  async deletePrompt(id: string): Promise<void> {
    await this.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Toggle favorite status of a prompt
   */
  async toggleFavorite(id: string, isFavorite: boolean): Promise<Prompt> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, {
      data: { isFavorite },
    });
    return normalizeStrapiEntity<Prompt>(response);
  }

  /**
   * Get favorite prompts
   */
  async getFavoritePrompts(): Promise<Prompt[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: { isFavorite: true },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<Prompt>(response);
  }

  /**
   * Search prompts by title or text
   */
  async searchPrompts(query: string): Promise<Prompt[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: {
        $or: [
          { title: { $containsi: query } },
          { promptText: { $containsi: query } },
          { category: { $containsi: query } },
        ],
      },
    });
    return normalizeStrapiCollection<Prompt>(response);
  }

  /**
   * Get prompts by tag
   */
  async getPromptsByTag(tagName: string): Promise<Prompt[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: {
        'tags.name': { $containsi: tagName },
      },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<Prompt>(response);
  }
}

// Export a singleton instance
export const promptLibraryService = new PromptLibraryService(); 