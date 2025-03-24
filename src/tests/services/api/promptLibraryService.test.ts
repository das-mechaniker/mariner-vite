import { PromptLibraryService } from '../../../services/api/promptLibraryService';

jest.mock('axios');

describe('PromptLibraryService', () => {
  let promptLibraryService: PromptLibraryService;

  beforeEach(() => {
    jest.clearAllMocks();
    promptLibraryService = new PromptLibraryService();
  });

  it('should get all prompts', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          attributes: {
            title: 'Test Prompt',
            promptText: 'This is a test prompt',
            category: {
              data: {
                id: '1',
                attributes: { name: 'Test Category' }
              }
            },
            tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            },
            isFavorite: false
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.getPrompts();

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts', {
      sort: 'updatedAt:desc'
    });

    // Check result was normalized correctly
    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Prompt',
        promptText: 'This is a test prompt',
        category: {
          data: {
            id: '1',
            attributes: {
              name: 'Test Category'
            }
          }
        },
        tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
        createdBy: {
          data: {
            id: '1',
            attributes: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        },
        isFavorite: false
      }
    ]);
  });

  it('should get prompts by category', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          attributes: {
            title: 'Test Prompt',
            promptText: 'This is a test prompt',
            category: {
              data: {
                id: '1',
                attributes: { name: 'Test Category' }
              }
            },
            tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            },
            isFavorite: false
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.getPromptsByCategory('1');

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts', {
      filters: { category: '1' },
      sort: 'updatedAt:desc'
    });

    // Check result was normalized correctly
    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Prompt',
        promptText: 'This is a test prompt',
        category: {
          data: {
            id: '1',
            attributes: {
              name: 'Test Category'
            }
          }
        },
        tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
        createdBy: {
          data: {
            id: '1',
            attributes: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        },
        isFavorite: false
      }
    ]);
  });

  it('should get a prompt by ID', async () => {
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          title: 'Test Prompt',
          promptText: 'This is a test prompt',
          category: {
            data: {
              id: '1',
              attributes: { name: 'Test Category' }
            }
          },
          tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
          createdBy: {
            data: {
              id: '1',
              attributes: {
                firstName: 'John',
                lastName: 'Doe'
              }
            }
          },
          isFavorite: false
        }
      }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.getPromptById('1');

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts/1');

    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      title: 'Test Prompt',
      promptText: 'This is a test prompt',
      category: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Category'
          }
        }
      },
      tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
      createdBy: {
        data: {
          id: '1',
          attributes: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      },
      isFavorite: false
    });
  });

  it('should create a prompt', async () => {
    const promptData = {
      title: 'New Prompt',
      promptText: 'This is a new prompt',
      categoryId: '1',
      tags: [{ id: '1', name: 'new' }, { id: '2', name: 'test' }]
    };

    const mockResponse = {
      data: {
        id: '2',
        attributes: {
          title: 'New Prompt',
          promptText: 'This is a new prompt',
          category: {
            data: {
              id: '1',
              attributes: { name: 'Test Category' }
            }
          },
          tags: [{ id: '1', name: 'new' }, { id: '2', name: 'test' }],
          createdBy: {
            data: {
              id: '1',
              attributes: {
                firstName: 'John',
                lastName: 'Doe'
              }
            }
          },
          isFavorite: false
        }
      }
    };

    jest.spyOn(promptLibraryService as any, 'post').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.createPrompt(promptData);

    // Check correct endpoint was called
    expect((promptLibraryService as any).post).toHaveBeenCalledWith('prompts', {
      data: promptData
    });

    // Check result was normalized correctly
    expect(result).toEqual({
      id: '2',
      title: 'New Prompt',
      promptText: 'This is a new prompt',
      category: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Category'
          }
        }
      },
      tags: [{ id: '1', name: 'new' }, { id: '2', name: 'test' }],
      createdBy: {
        data: {
          id: '1',
          attributes: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      },
      isFavorite: false
    });
  });

  it('should update a prompt', async () => {
    const promptData = {
      title: 'Updated Prompt',
      promptText: 'This is an updated prompt',
      categoryId: '1',
      tags: [{ id: '3', name: 'updated' }, { id: '2', name: 'test' }]
    };

    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          title: 'Updated Prompt',
          promptText: 'This is an updated prompt',
          category: {
            data: {
              id: '1',
              attributes: { name: 'Test Category' }
            }
          },
          tags: [{ id: '3', name: 'updated' }, { id: '2', name: 'test' }],
          createdBy: {
            data: {
              id: '1',
              attributes: {
                firstName: 'John',
                lastName: 'Doe'
              }
            }
          },
          isFavorite: false
        }
      }
    };

    jest.spyOn(promptLibraryService as any, 'put').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.updatePrompt('1', promptData);

    // Check correct endpoint was called
    expect((promptLibraryService as any).put).toHaveBeenCalledWith('prompts/1', {
      data: promptData
    });

    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      title: 'Updated Prompt',
      promptText: 'This is an updated prompt',
      category: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Category'
          }
        }
      },
      tags: [{ id: '3', name: 'updated' }, { id: '2', name: 'test' }],
      createdBy: {
        data: {
          id: '1',
          attributes: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      },
      isFavorite: false
    });
  });

  it('should delete a prompt', async () => {
    jest.spyOn(promptLibraryService as any, 'delete').mockResolvedValue({});

    await promptLibraryService.deletePrompt('1');

    // Check correct endpoint was called
    expect((promptLibraryService as any).delete).toHaveBeenCalledWith('prompts/1');
  });

  it('should toggle favorite status', async () => {
    const mockResponse = {
      data: {
        id: '1',
        attributes: {
          title: 'Test Prompt',
          promptText: 'This is a test prompt',
          category: {
            data: {
              id: '1',
              attributes: { name: 'Test Category' }
            }
          },
          tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
          createdBy: {
            data: {
              id: '1',
              attributes: {
                firstName: 'John',
                lastName: 'Doe'
              }
            }
          },
          isFavorite: true
        }
      }
    };

    jest.spyOn(promptLibraryService as any, 'put').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.toggleFavorite('1', true);

    // Check correct endpoint was called
    expect((promptLibraryService as any).put).toHaveBeenCalledWith('prompts/1', {
      data: { isFavorite: true }
    });

    // Check result was normalized correctly
    expect(result).toEqual({
      id: '1',
      title: 'Test Prompt',
      promptText: 'This is a test prompt',
      category: {
        data: {
          id: '1',
          attributes: {
            name: 'Test Category'
          }
        }
      },
      tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
      createdBy: {
        data: {
          id: '1',
          attributes: {
            firstName: 'John',
            lastName: 'Doe'
          }
        }
      },
      isFavorite: true
    });
  });

  it('should get favorite prompts', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          attributes: {
            title: 'Test Prompt',
            promptText: 'This is a test prompt',
            category: {
              data: {
                id: '1',
                attributes: { name: 'Test Category' }
              }
            },
            tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            },
            isFavorite: true
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.getFavoritePrompts();

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts', {
      filters: { isFavorite: true },
      sort: 'updatedAt:desc'
    });

    // Check result was normalized correctly
    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Prompt',
        promptText: 'This is a test prompt',
        category: {
          data: {
            id: '1',
            attributes: {
              name: 'Test Category'
            }
          }
        },
        tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
        createdBy: {
          data: {
            id: '1',
            attributes: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        },
        isFavorite: true
      }
    ]);
  });

  it('should search prompts by query', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          attributes: {
            title: 'Test Prompt',
            promptText: 'This is a test prompt',
            category: {
              data: {
                id: '1',
                attributes: { name: 'Test Category' }
              }
            },
            tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            },
            isFavorite: false
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.searchPrompts('test');

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts', {
      filters: {
        $or: [
          { title: { $containsi: 'test' } },
          { promptText: { $containsi: 'test' } },
          { category: { $containsi: 'test' } }
        ]
      }
    });

    // Check result was normalized correctly
    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Prompt',
        promptText: 'This is a test prompt',
        category: {
          data: {
            id: '1',
            attributes: {
              name: 'Test Category'
            }
          }
        },
        tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
        createdBy: {
          data: {
            id: '1',
            attributes: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        },
        isFavorite: false
      }
    ]);
  });

  it('should get prompts by tag', async () => {
    const mockResponse = {
      data: [
        {
          id: '1',
          attributes: {
            title: 'Test Prompt',
            promptText: 'This is a test prompt',
            category: {
              data: {
                id: '1',
                attributes: { name: 'Test Category' }
              }
            },
            tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
            createdBy: {
              data: {
                id: '1',
                attributes: {
                  firstName: 'John',
                  lastName: 'Doe'
                }
              }
            },
            isFavorite: false
          }
        }
      ],
      meta: { pagination: { page: 1, pageSize: 25, total: 1 } }
    };

    jest.spyOn(promptLibraryService as any, 'get').mockResolvedValue(mockResponse);

    const result = await promptLibraryService.getPromptsByTag('test');

    // Check correct endpoint was called
    expect((promptLibraryService as any).get).toHaveBeenCalledWith('prompts', {
      filters: { 'tags.name': { $containsi: 'test' } },
      sort: 'updatedAt:desc'
    });

    // Check result was normalized correctly
    expect(result).toEqual([
      {
        id: '1',
        title: 'Test Prompt',
        promptText: 'This is a test prompt',
        category: {
          data: {
            id: '1',
            attributes: {
              name: 'Test Category'
            }
          }
        },
        tags: [{ id: '1', name: 'test' }, { id: '2', name: 'example' }],
        createdBy: {
          data: {
            id: '1',
            attributes: {
              firstName: 'John',
              lastName: 'Doe'
            }
          }
        },
        isFavorite: false
      }
    ]);
  });
}); 