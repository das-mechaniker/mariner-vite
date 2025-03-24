import { AgentService } from '../../../services/api/agentService';

// Mock axios
jest.mock('axios');

describe('AgentService', () => {
  let agentService: AgentService;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh instance for each test
    agentService = new AgentService();
  });
  
  describe('Agent methods', () => {
    const mockAgentResponse = {
      data: {
        data: [
          {
            id: '1',
            attributes: {
              name: 'Research Agent',
              description: 'Agent for research tasks',
              category: 'research',
              icon: 'IconResearch',
              modelId: 'gpt-4',
              capabilities: [
                { id: '1', name: 'Writing', description: 'Can write content' },
                { id: '2', name: 'Research', description: 'Can perform research tasks' }
              ],
              usageCount: 15,
              lastUsed: '2023-03-15T10:30:00Z',
              isPublic: true,
              isFavorite: false,
              color: '#336699',
              createdAt: '2023-01-01T00:00:00Z',
              updatedAt: '2023-01-10T00:00:00Z',
              createdBy: {
                data: {
                  id: '1',
                  attributes: {
                    firstName: 'John',
                    lastName: 'Doe',
                  },
                },
              },
            },
          },
          {
            id: '2',
            attributes: {
              name: 'Code Assistant',
              description: 'Agent for coding tasks',
              category: 'coding',
              icon: 'IconCode',
              modelId: 'gpt-4',
              capabilities: [
                { id: '3', name: 'Coding', description: 'Can write code' },
                { id: '4', name: 'Debugging', description: 'Can debug code' }
              ],
              usageCount: 10,
              lastUsed: '2023-03-18T14:20:00Z',
              isPublic: true,
              isFavorite: true,
              color: '#66CC99',
              createdAt: '2023-01-02T00:00:00Z',
              updatedAt: '2023-01-12T00:00:00Z',
              createdBy: {
                data: {
                  id: '2',
                  attributes: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                  },
                },
              },
            },
          },
        ],
        meta: {
          pagination: {
            page: 1,
            pageSize: 25,
            total: 2,
          },
        },
      },
    };

    const mockSingleAgentResponse = {
      data: {
        data: {
          id: '1',
          attributes: {
            name: 'Research Agent',
            description: 'Agent for research tasks',
            category: 'research',
            icon: 'IconResearch',
            modelId: 'gpt-4',
            capabilities: [
              { id: '1', name: 'Writing', description: 'Can write content' },
              { id: '2', name: 'Research', description: 'Can perform research tasks' }
            ],
            usageCount: 15,
            lastUsed: '2023-03-15T10:30:00Z',
            isPublic: true,
            isFavorite: false,
            color: '#336699',
            createdAt: '2023-01-01T00:00:00Z',
            updatedAt: '2023-01-10T00:00:00Z',
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe',
                },
              },
            },
          },
        },
      },
    };

    it('should get all agents', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockAgentResponse);

      // Call the service method
      const agents = await agentService.getAgents();

      // Expect the normalized agents to be returned
      expect(agents.length).toBe(2);
      expect(agents[0].id).toBe('1');
      expect(agents[0].name).toBe('Research Agent');
    });

    it('should get featured agents', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockAgentResponse);

      // Call the service method
      const agents = await agentService.getFeaturedAgents();
      
      // Check the result
      expect(agents.length).toBe(2);
    });

    it('should get agent by id', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockSingleAgentResponse);

      // Call the service method
      const agent = await agentService.getAgentById('1');

      // Expect the normalized agent to be returned
      expect(agent.id).toBe('1');
      expect(agent.name).toBe('Research Agent');
    });

    it('should create an agent', async () => {
      const newAgent = {
        name: 'New Agent',
        description: 'A new agent',
        category: 'general',
        modelId: 'gpt-4',
        capabilities: [
          { id: '1', name: 'General', description: 'General capabilities' }
        ],
        isPublic: true,
        color: '#123456',
      };

      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockSingleAgentResponse);

      // Call the service method
      await agentService.createAgent(newAgent);
    });

    it('should update an agent', async () => {
      const updateData = {
        name: 'Updated Agent',
        description: 'An updated agent',
      };

      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockSingleAgentResponse);

      // Call the service method
      await agentService.updateAgent('1', updateData);
    });

    it('should delete an agent', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce({});

      // Call the service method
      await agentService.deleteAgent('1');
    });

    it('should increment usage count', async () => {
      // Mock axios response for getAgentById
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockSingleAgentResponse);
      
      // Mock axios response for incrementUsage
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce({
        data: {
          data: {
            ...mockSingleAgentResponse.data.data,
            attributes: {
              ...mockSingleAgentResponse.data.data.attributes,
              usageCount: 16,
            },
          },
        },
      });

      // Call the service method
      await agentService.incrementUsage('1');
    });

    it('should handle toggle favorite', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce({
        data: {
          data: {
            id: '1',
            attributes: {
              name: 'Research Agent',
              description: 'Agent for research tasks',
              isFavorite: true,
            },
          },
        },
      });

      // Call the service method
      await agentService.toggleFavorite('1', true);
    });

    it('should search agents', async () => {
      // Mock axios response
      // @ts-ignore - Mocking module import dynamically
      (await import('axios')).default.mockResolvedValueOnce(mockAgentResponse);

      // Call the service method
      await agentService.searchAgents('research');
    });
  });
}); 