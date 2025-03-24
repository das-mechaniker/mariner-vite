import { BaseApiService } from './base';
import { ResearchLab, normalizeStrapiCollection, normalizeStrapiEntity } from '../../types/api';

export class ResearchLabService extends BaseApiService {
  private readonly endpoint = 'research-labs';

  /**
   * Get all research labs
   */
  async getResearchLabs(query?: Record<string, any>): Promise<ResearchLab[]> {
    const response = await this.get<any>(this.endpoint, {
      sort: 'updatedAt:desc',
      ...query,
    });
    return normalizeStrapiCollection<ResearchLab>(response);
  }

  /**
   * Get public research labs
   */
  async getPublicResearchLabs(): Promise<ResearchLab[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: { isPublic: true },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<ResearchLab>(response);
  }

  /**
   * Get a research lab by ID
   */
  async getResearchLabById(id: string): Promise<ResearchLab> {
    const response = await this.get<any>(`${this.endpoint}/${id}`);
    return normalizeStrapiEntity<ResearchLab>(response);
  }

  /**
   * Create a new research lab
   */
  async createResearchLab(labData: Partial<ResearchLab>): Promise<ResearchLab> {
    const response = await this.post<any>(this.endpoint, { data: labData });
    return normalizeStrapiEntity<ResearchLab>(response);
  }

  /**
   * Update an existing research lab
   */
  async updateResearchLab(id: string, labData: Partial<ResearchLab>): Promise<ResearchLab> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, { data: labData });
    return normalizeStrapiEntity<ResearchLab>(response);
  }

  /**
   * Delete a research lab
   */
  async deleteResearchLab(id: string): Promise<void> {
    await this.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Search research labs by name or description
   */
  async searchResearchLabs(query: string): Promise<ResearchLab[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
        ],
        isPublic: true,
      },
    });
    return normalizeStrapiCollection<ResearchLab>(response);
  }

  /**
   * Get research labs by creator
   */
  async getResearchLabsByCreator(creatorId: string): Promise<ResearchLab[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: {
        'createdBy.id': creatorId,
      },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<ResearchLab>(response);
  }

  /**
   * Toggle the public status of a research lab
   */
  async togglePublicStatus(id: string, isPublic: boolean): Promise<ResearchLab> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, {
      data: {
        isPublic,
      },
    });
    
    return normalizeStrapiEntity<ResearchLab>(response);
  }
  
  /**
   * Add a collaborator to a research lab
   */
  async addCollaborator(labId: string, userId: string): Promise<ResearchLab> {
    const response = await this.put<any>(`${this.endpoint}/${labId}/collaborators`, {
      data: {
        userId,
      },
    });
    
    return normalizeStrapiEntity<ResearchLab>(response);
  }
  
  /**
   * Remove a collaborator from a research lab
   */
  async removeCollaborator(labId: string, userId: string): Promise<ResearchLab> {
    const response = await this.delete<any>(`${this.endpoint}/${labId}/collaborators/${userId}`);
    
    return normalizeStrapiEntity<ResearchLab>(response);
  }
}

// Export a singleton instance
export const researchLabService = new ResearchLabService(); 