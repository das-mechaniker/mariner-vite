import { ResearchLabService } from '../../../services/api/researchLabService';

// Mock axios
jest.mock('axios');

describe('ResearchLabService', () => {
  let researchLabService: ResearchLabService;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh instance for each test
    researchLabService = new ResearchLabService();
  });
  
  it('should get all research labs', async () => {
    // Mock response data
    const mockLabs = {
      data: [
        { 
          id: '1', 
          attributes: { 
            name: 'AI Ethics Lab', 
            description: 'Researching ethical implications of AI',
            isPublic: true,
            createdBy: {
              data: {
                id: '1',
                attributes: { firstName: 'John', lastName: 'Doe' },
              },
            },
          },
        },
        { 
          id: '2', 
          attributes: { 
            name: 'ML Research Lab', 
            description: 'Advanced machine learning research',
            isPublic: false,
            createdBy: {
              data: {
                id: '1',
                attributes: { firstName: 'John', lastName: 'Doe' },
              },
            },
          },
        },
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 2 } },
    };
    
    // Spy on and mock get method
    jest.spyOn(researchLabService as any, 'get').mockResolvedValueOnce(mockLabs);
    
    // Call the service method
    const result = await researchLabService.getResearchLabs();
    
    // Check if get was called correctly
    expect((researchLabService as any).get).toHaveBeenCalledWith('research-labs', {
      sort: 'updatedAt:desc',
    });
    
    // Check result was normalized correctly
    expect(result).toEqual([
      { 
        id: '1', 
        name: 'AI Ethics Lab', 
        description: 'Researching ethical implications of AI',
        isPublic: true,
        createdBy: {
          data: {
            id: '1',
            attributes: { firstName: 'John', lastName: 'Doe' },
          },
        },
      },
      { 
        id: '2', 
        name: 'ML Research Lab', 
        description: 'Advanced machine learning research',
        isPublic: false,
        createdBy: {
          data: {
            id: '1',
            attributes: { firstName: 'John', lastName: 'Doe' },
          },
        },
      },
    ]);
  });
  
  it('should get public research labs', async () => {
    // Mock response data
    const mockLabs = {
      data: [
        { 
          id: '1', 
          attributes: { 
            name: 'AI Ethics Lab', 
            description: 'Researching ethical implications of AI',
            isPublic: true,
            createdBy: {
              data: {
                id: '1',
                attributes: { firstName: 'John', lastName: 'Doe' },
              },
            },
          },
        },
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } },
    };
    
    // Spy on and mock get method
    jest.spyOn(researchLabService as any, 'get').mockResolvedValueOnce(mockLabs);
    
    // Call the service method
    const result = await researchLabService.getPublicResearchLabs();
    
    // Check if get was called correctly with public filter
    expect((researchLabService as any).get).toHaveBeenCalledWith('research-labs', {
      filters: { isPublic: true },
      sort: 'updatedAt:desc',
    });
    
    // Check result was normalized correctly
    expect(result).toEqual([
      { 
        id: '1', 
        name: 'AI Ethics Lab', 
        description: 'Researching ethical implications of AI',
        isPublic: true,
        createdBy: {
          data: {
            id: '1',
            attributes: { firstName: 'John', lastName: 'Doe' },
          },
        },
      },
    ]);
  });
  
  it('should get a research lab by ID', async () => {
    // Mock response data
    const mockLab = {
      data: {
        id: '1', 
        attributes: { 
          name: 'AI Ethics Lab', 
          description: 'Researching ethical implications of AI',
          isPublic: true,
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock get method
    jest.spyOn(researchLabService as any, 'get').mockResolvedValueOnce(mockLab);
    
    // Call the service method
    const result = await researchLabService.getResearchLabById('1');
    
    // Check if get was called correctly
    expect((researchLabService as any).get).toHaveBeenCalledWith('research-labs/1');
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1', 
      name: 'AI Ethics Lab', 
      description: 'Researching ethical implications of AI',
      isPublic: true,
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
  
  it('should create a research lab', async () => {
    // Lab data to create
    const labData = {
      name: 'New Research Lab',
      description: 'Cutting-edge research',
      isPublic: true,
    };
    
    // Mock response data
    const mockResponse = {
      data: {
        id: '3',
        attributes: { 
          ...labData,
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock post method
    jest.spyOn(researchLabService as any, 'post').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    const result = await researchLabService.createResearchLab(labData);
    
    // Check if post was called correctly
    expect((researchLabService as any).post).toHaveBeenCalledWith('research-labs', {
      data: labData,
    });
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '3',
      ...labData,
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
  
  it('should update a research lab', async () => {
    // Update data
    const updateData = {
      name: 'Updated Lab Name',
      description: 'Updated description',
    };
    
    // Mock response data
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          name: 'Updated Lab Name',
          description: 'Updated description',
          isPublic: true,
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock put method
    jest.spyOn(researchLabService as any, 'put').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    const result = await researchLabService.updateResearchLab('1', updateData);
    
    // Check if put was called correctly
    expect((researchLabService as any).put).toHaveBeenCalledWith('research-labs/1', {
      data: updateData,
    });
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      name: 'Updated Lab Name',
      description: 'Updated description',
      isPublic: true,
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
  
  it('should delete a research lab', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          name: 'AI Research Lab',
          description: 'Cutting-edge AI research lab',
          isPublic: true,
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock delete method
    jest.spyOn(researchLabService as any, 'delete').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    await researchLabService.deleteResearchLab('1');
    
    // Check if delete was called correctly
    expect((researchLabService as any).delete).toHaveBeenCalledWith('research-labs/1');
  });
  
  it('should toggle public status', async () => {
    // Mock response data
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          name: 'AI Ethics Lab',
          description: 'Researching ethical implications of AI',
          isPublic: true,
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock put method
    jest.spyOn(researchLabService as any, 'put').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    const result = await researchLabService.togglePublicStatus('1', true);
    
    // Check if put was called correctly
    expect((researchLabService as any).put).toHaveBeenCalledWith('research-labs/1', {
      data: { isPublic: true },
    });
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      name: 'AI Ethics Lab',
      description: 'Researching ethical implications of AI',
      isPublic: true,
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
  
  it('should add a collaborator', async () => {
    // Mock response data with collaborators added
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          name: 'AI Ethics Lab',
          description: 'Researching ethical implications of AI',
          isPublic: true,
          collaborators: {
            data: [
              {
                id: '2',
                attributes: { firstName: 'Jane', lastName: 'Smith' },
              },
            ],
          },
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock put method
    jest.spyOn(researchLabService as any, 'put').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    const result = await researchLabService.addCollaborator('1', '2');
    
    // Check if put was called correctly
    expect((researchLabService as any).put).toHaveBeenCalledWith('research-labs/1/collaborators', {
      data: { userId: '2' },
    });
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      name: 'AI Ethics Lab',
      description: 'Researching ethical implications of AI',
      isPublic: true,
      collaborators: {
        data: [
          {
            id: '2',
            attributes: { firstName: 'Jane', lastName: 'Smith' },
          },
        ],
      },
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
  
  it('should remove a collaborator', async () => {
    // Mock response data with collaborator removed
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          name: 'AI Ethics Lab',
          description: 'Researching ethical implications of AI',
          isPublic: true,
          collaborators: {
            data: [],
          },
          createdBy: {
            data: {
              id: '1',
              attributes: { firstName: 'John', lastName: 'Doe' },
            },
          },
        },
      }
    };
    
    // Spy on and mock delete method
    jest.spyOn(researchLabService as any, 'delete').mockResolvedValueOnce(mockResponse);
    
    // Call the service method
    const result = await researchLabService.removeCollaborator('1', '2');
    
    // Check if delete was called correctly
    expect((researchLabService as any).delete).toHaveBeenCalledWith('research-labs/1/collaborators/2');
    
    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      name: 'AI Ethics Lab',
      description: 'Researching ethical implications of AI',
      isPublic: true,
      collaborators: {
        data: [],
      },
      createdBy: {
        data: {
          id: '1',
          attributes: { firstName: 'John', lastName: 'Doe' },
        },
      },
    });
  });
}); 