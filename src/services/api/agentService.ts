import { BaseApiService } from './base';
import { Agent, normalizeStrapiCollection, normalizeStrapiEntity } from '../../types/api';

// Mock data for when API connection fails
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Investment Analyzer',
    description: 'Analyzes investment opportunities and provides recommendations based on market trends and financial data.',
    category: 'Financial Analysis',
    icon: '📊',
    modelId: 'gpt-4',
    color: '#4F46E5',
    capabilities: [],
    usageCount: 42,
    lastUsed: new Date().toISOString(),
    isFavorite: true,
    isPublic: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-03-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Portfolio Manager',
    description: 'Helps organize and optimize investment portfolios based on risk tolerance and financial goals.',
    category: 'Portfolio Management',
    icon: '💼',
    modelId: 'gpt-4',
    color: '#10B981',
    capabilities: [],
    usageCount: 28,
    lastUsed: new Date().toISOString(),
    isFavorite: false,
    isPublic: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-03-10T00:00:00Z'
  },
  {
    id: '3',
    name: 'Market Research Assistant',
    description: 'Gathers and analyzes market data to identify trends and potential investment opportunities.',
    category: 'Market Research',
    icon: '🔍',
    modelId: 'gpt-4',
    color: '#F59E0B',
    capabilities: [],
    usageCount: 35,
    lastUsed: new Date().toISOString(),
    isFavorite: false,
    isPublic: true,
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-03-20T00:00:00Z'
  },
  {
    id: '4',
    name: 'Risk Assessment Tool',
    description: 'Evaluates potential risks associated with different investment strategies and assets.',
    category: 'Risk Management',
    icon: '⚠️',
    modelId: 'gpt-4',
    color: '#EF4444',
    capabilities: [],
    usageCount: 22,
    lastUsed: new Date().toISOString(),
    isFavorite: true,
    isPublic: true,
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-03-25T00:00:00Z'
  },
  {
    id: '5',
    name: 'Financial Advisor',
    description: 'Provides personalized financial advice based on individual circumstances and goals.',
    category: 'Financial Planning',
    icon: '💰',
    modelId: 'gpt-4',
    color: '#8B5CF6',
    capabilities: [],
    usageCount: 48,
    lastUsed: new Date().toISOString(),
    isFavorite: false,
    isPublic: true,
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2023-03-30T00:00:00Z'
  },
  {
    id: '6',
    name: 'Retirement Planner',
    description: 'Helps create and manage retirement savings plans with projections and recommendations.',
    category: 'Financial Planning',
    icon: '🏖️',
    modelId: 'gpt-4',
    color: '#3B82F6',
    capabilities: [],
    usageCount: 18,
    lastUsed: new Date().toISOString(),
    isFavorite: false,
    isPublic: true,
    createdAt: '2023-03-15T00:00:00Z',
    updatedAt: '2023-04-05T00:00:00Z'
  }
];

export class AgentService extends BaseApiService {
  private readonly endpoint = 'agents';
  private useMockData = false;

  constructor() {
    super();
    // Check if we can connect to the API, otherwise use mock data
    this.checkApiConnection();
  }

  /**
   * Check if we can connect to the API
   */
  private async checkApiConnection(): Promise<void> {
    try {
      // Create an AbortController with timeout to cancel the fetch request if it takes too long
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(this.baseUrl, { 
        method: 'HEAD',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // If we get here, connection succeeded
      if (response.ok) {
        console.info('API connection successful');
        this.useMockData = false;
      } else {
        console.warn('API returned error status:', response.status);
        this.useMockData = true;
      }
    } catch (err) {
      console.warn('API connection failed, using mock data instead:', err instanceof Error ? err.message : String(err));
      this.useMockData = true;
    }
  }

  /**
   * Get all agents with optional filtering
   */
  async getAgents(query?: Record<string, any>): Promise<Agent[]> {
    try {
      if (this.useMockData) {
        console.info('Using mock agent data');
        return MOCK_AGENTS;
      }
      const response = await this.get<any>(this.endpoint, query);
      return normalizeStrapiCollection<Agent>(response);
    } catch (err) {
      console.error('Error fetching agents:', err instanceof Error ? err.message : JSON.stringify(err));
      // Fall back to mock data if API call fails
      return MOCK_AGENTS;
    }
  }

  /**
   * Get featured agents
   */
  async getFeaturedAgents(): Promise<Agent[]> {
    try {
      if (this.useMockData) {
        return MOCK_AGENTS.filter(agent => agent.isFavorite).slice(0, 4);
      }
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
    } catch (err) {
      console.error('Error fetching featured agents:', err instanceof Error ? err.message : JSON.stringify(err));
      return MOCK_AGENTS.filter(agent => agent.isFavorite).slice(0, 4);
    }
  }

  /**
   * Get an agent by ID
   */
  async getAgentById(id: string): Promise<Agent> {
    try {
      if (this.useMockData) {
        const agent = MOCK_AGENTS.find(a => a.id === id);
        if (!agent) throw new Error(`Agent with ID ${id} not found`);
        return agent;
      }
      const response = await this.get<any>(`${this.endpoint}/${id}`);
      return normalizeStrapiEntity<Agent>(response);
    } catch (err) {
      console.error('Error fetching agent by ID:', err instanceof Error ? err.message : JSON.stringify(err));
      const mockAgent = MOCK_AGENTS.find(a => a.id === id);
      if (!mockAgent) throw new Error(`Agent with ID ${id} not found`);
      return mockAgent;
    }
  }

  /**
   * Create a new agent
   */
  async createAgent(agentData: Partial<Agent>): Promise<Agent> {
    try {
      if (this.useMockData) {
        const newAgent: Agent = {
          id: String(MOCK_AGENTS.length + 1),
          ...agentData,
          capabilities: agentData.capabilities || [],
          usageCount: 0,
          lastUsed: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        } as Agent;
        return newAgent;
      }
      const response = await this.post<any>(this.endpoint, { data: agentData });
      return normalizeStrapiEntity<Agent>(response);
    } catch (err) {
      console.error('Error creating agent:', err instanceof Error ? err.message : JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Update an existing agent
   */
  async updateAgent(id: string, agentData: Partial<Agent>): Promise<Agent> {
    try {
      if (this.useMockData) {
        const index = MOCK_AGENTS.findIndex(a => a.id === id);
        if (index === -1) throw new Error(`Agent with ID ${id} not found`);
        const updatedAgent = { ...MOCK_AGENTS[index], ...agentData, updatedAt: new Date().toISOString() };
        return updatedAgent;
      }
      const response = await this.put<any>(`${this.endpoint}/${id}`, { data: agentData });
      return normalizeStrapiEntity<Agent>(response);
    } catch (err) {
      console.error('Error updating agent:', err instanceof Error ? err.message : JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Toggle favorite status of an agent
   */
  async toggleFavorite(id: string, isFavorite: boolean): Promise<Agent> {
    try {
      if (this.useMockData) {
        const index = MOCK_AGENTS.findIndex(a => a.id === id);
        if (index === -1) throw new Error(`Agent with ID ${id} not found`);
        
        const updatedAgent = { ...MOCK_AGENTS[index], isFavorite, updatedAt: new Date().toISOString() };
        MOCK_AGENTS[index] = updatedAgent;
        return updatedAgent;
      }
      const response = await this.put<any>(`${this.endpoint}/${id}`, {
        data: { isFavorite },
      });
      return normalizeStrapiEntity<Agent>(response);
    } catch (err) {
      console.error('Error toggling favorite:', err instanceof Error ? err.message : JSON.stringify(err));
      // Handle mock data update even in error case
      if (this.useMockData) {
        const index = MOCK_AGENTS.findIndex(a => a.id === id);
        if (index >= 0) {
          const updatedAgent = { ...MOCK_AGENTS[index], isFavorite, updatedAt: new Date().toISOString() };
          MOCK_AGENTS[index] = updatedAgent;
          return updatedAgent;
        }
      }
      throw err;
    }
  }

  /**
   * Increment usage count for an agent
   */
  async incrementUsage(id: string): Promise<Agent> {
    try {
      if (this.useMockData) {
        const index = MOCK_AGENTS.findIndex(a => a.id === id);
        if (index === -1) throw new Error(`Agent with ID ${id} not found`);
        
        const agent = MOCK_AGENTS[index];
        const updatedAgent = { 
          ...agent, 
          usageCount: agent.usageCount + 1, 
          lastUsed: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        MOCK_AGENTS[index] = updatedAgent;
        return updatedAgent;
      }
      
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
    } catch (err) {
      console.error('Error incrementing usage:', err instanceof Error ? err.message : JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Delete an agent
   */
  async deleteAgent(id: string): Promise<void> {
    try {
      if (this.useMockData) {
        const index = MOCK_AGENTS.findIndex(a => a.id === id);
        if (index === -1) throw new Error(`Agent with ID ${id} not found`);
        MOCK_AGENTS.splice(index, 1);
        return;
      }
      await this.delete(`${this.endpoint}/${id}`);
    } catch (err) {
      console.error('Error deleting agent:', err instanceof Error ? err.message : JSON.stringify(err));
      throw err;
    }
  }

  /**
   * Search agents by name or description
   */
  async searchAgents(query: string): Promise<Agent[]> {
    try {
      if (this.useMockData) {
        const lowercaseQuery = query.toLowerCase();
        return MOCK_AGENTS.filter(agent => 
          agent.name.toLowerCase().includes(lowercaseQuery) ||
          agent.description.toLowerCase().includes(lowercaseQuery) ||
          agent.category.toLowerCase().includes(lowercaseQuery)
        );
      }
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
    } catch (err) {
      console.error('Error searching agents:', err instanceof Error ? err.message : JSON.stringify(err));
      // Fall back to mock data search
      const lowercaseQuery = query.toLowerCase();
      return MOCK_AGENTS.filter(agent => 
        agent.name.toLowerCase().includes(lowercaseQuery) ||
        agent.description.toLowerCase().includes(lowercaseQuery) ||
        agent.category.toLowerCase().includes(lowercaseQuery)
      );
    }
  }
}

// Export a singleton instance
export const agentService = new AgentService(); 