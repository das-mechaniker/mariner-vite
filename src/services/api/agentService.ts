import { BaseApiService } from './base';
import { Agent, normalizeStrapiCollection, normalizeStrapiEntity } from '../../types/api';

export class AgentService extends BaseApiService {
  private readonly endpoint = 'agents';

  /**
   * Get all agents with optional filtering
   */
  async getAgents(query?: Record<string, any>): Promise<Agent[]> {
    const response = await this.get<any>(this.endpoint, query);
    return normalizeStrapiCollection<Agent>(response);
  }

  /**
   * Get featured agents
   */
  async getFeaturedAgents(): Promise<Agent[]> {
    const response = await this.get<any>(`${this.endpoint}`, {
      filters: {
        isFavorite: true,
        isPublic: true,
      },
      sort: 'usageCount:desc',
      pagination: {
        limit: 4,
      },
    });
    return normalizeStrapiCollection<Agent>(response);
  }

  /**
   * Get an agent by ID
   */
  async getAgentById(id: string): Promise<Agent> {
    const response = await this.get<any>(`${this.endpoint}/${id}`);
    return normalizeStrapiEntity<Agent>(response);
  }

  /**
   * Create a new agent
   */
  async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    const response = await this.post<any>(this.endpoint, { data: agentData });
    return normalizeStrapiEntity<Agent>(response);
  }

  /**
   * Update an existing agent
   */
  async updateAgent(id: string, agentData: Partial<Agent>): Promise<Agent> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, { data: agentData });
    return normalizeStrapiEntity<Agent>(response);
  }

  /**
   * Toggle favorite status of an agent
   */
  async toggleFavorite(id: string, isFavorite: boolean): Promise<Agent> {
    const response = await this.put<any>(`${this.endpoint}/${id}`, {
      data: { isFavorite },
    });
    return normalizeStrapiEntity<Agent>(response);
  }

  /**
   * Increment usage count for an agent
   */
  async incrementUsage(id: string): Promise<Agent> {
    // Get current agent
    const agent = await this.getAgentById(id);
    
    // Increment usage count and update last used
    const response = await this.put<any>(`${this.endpoint}/${id}`, {
      data: {
        usageCount: agent.usageCount + 1,
        lastUsed: new Date().toISOString(),
      },
    });
    return normalizeStrapiEntity<Agent>(response);
  }

  /**
   * Delete an agent
   */
  async deleteAgent(id: string): Promise<void> {
    await this.delete(`${this.endpoint}/${id}`);
  }

  /**
   * Search agents by name or description
   */
  async searchAgents(query: string): Promise<Agent[]> {
    const response = await this.get<any>(this.endpoint, {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
          { category: { $containsi: query } },
        ],
      },
    });
    return normalizeStrapiCollection<Agent>(response);
  }
}

// Export a singleton instance
export const agentService = new AgentService(); 