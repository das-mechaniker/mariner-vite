import { DocumentationService } from '../../../services/api/documentationService';

// Mock axios
jest.mock('axios');

describe('DocumentationService', () => {
  let documentationService: DocumentationService;
  
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Create a fresh instance for each test
    documentationService = new DocumentationService();
  });
  
  // Categories tests
  describe('Categories', () => {
    it('should get all categories and normalize the response', async () => {
      const mockCategoriesResponse = {
        data: [
          { id: '1', attributes: { title: 'Getting Started', slug: 'getting-started', order: 1 } },
          { id: '2', attributes: { title: 'Advanced Usage', slug: 'advanced-usage', order: 2 } },
        ],
        meta: { pagination: { page: 1, pageSize: 25, total: 2 } }
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockCategoriesResponse);

      const result = await documentationService.getCategories();

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-categories', {
        sort: 'order:asc',
      });

      // Check result was normalized correctly
      expect(result).toEqual([
        { id: '1', title: 'Getting Started', slug: 'getting-started', order: 1 },
        { id: '2', title: 'Advanced Usage', slug: 'advanced-usage', order: 2 },
      ]);
    });
    
    it('should get a category by ID and normalize the response', async () => {
      const mockCategoryResponse = {
        data: {
          id: '1',
          attributes: { title: 'Getting Started', slug: 'getting-started', order: 1 }
        }
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockCategoryResponse);

      const result = await documentationService.getCategoryById('1');

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-categories/1');

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        title: 'Getting Started',
        slug: 'getting-started',
        order: 1
      });
    });
    
    it('should get a category by slug and normalize the response', async () => {
      const mockCategoryResponse = {
        data: [
          {
            id: '1',
            attributes: { title: 'Getting Started', slug: 'getting-started', order: 1 }
          }
        ]
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockCategoryResponse);

      const result = await documentationService.getCategoryBySlug('getting-started');

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-categories', {
        filters: { slug: 'getting-started' },
      });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        title: 'Getting Started',
        slug: 'getting-started',
        order: 1
      });
    });
    
    it('should create a category and normalize the response', async () => {
      const categoryData = {
        title: 'New Category',
        slug: 'new-category',
        order: 3
      };

      const mockCategoryResponse = {
        data: {
          id: '3',
          attributes: categoryData
        }
      };

      jest.spyOn(documentationService as any, 'post').mockResolvedValue(mockCategoryResponse);

      const result = await documentationService.createCategory(categoryData);

      // Check correct endpoint was called
      expect((documentationService as any).post).toHaveBeenCalledWith('documentation-categories', { data: categoryData });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '3',
        ...categoryData
      });
    });
    
    it('should update a category and normalize the response', async () => {
      const categoryData = {
        title: 'Updated Category',
        slug: 'updated-category',
        order: 1
      };

      const mockCategoryResponse = {
        data: {
          id: '1',
          attributes: categoryData
        }
      };

      jest.spyOn(documentationService as any, 'put').mockResolvedValue(mockCategoryResponse);

      const result = await documentationService.updateCategory('1', categoryData);

      // Check correct endpoint was called
      expect((documentationService as any).put).toHaveBeenCalledWith('documentation-categories/1', { data: categoryData });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        ...categoryData
      });
    });
    
    it('should delete a category', async () => {
      jest.spyOn(documentationService as any, 'delete').mockResolvedValue({});

      await documentationService.deleteCategory('1');

      // Check correct endpoint was called
      expect((documentationService as any).delete).toHaveBeenCalledWith('documentation-categories/1');
    });
  });
  
  // Articles tests
  describe('Articles', () => {
    it('should get all articles and normalize the response', async () => {
      const mockArticlesResponse = {
        data: [
          {
            id: '1',
            attributes: {
              title: 'Introduction',
              slug: 'introduction',
              content: 'Welcome to the documentation',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          },
          {
            id: '2',
            attributes: {
              title: 'Configuration',
              slug: 'configuration',
              content: 'How to configure the application',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          }
        ],
        meta: { pagination: { page: 1, pageSize: 25, total: 2 } }
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockArticlesResponse);

      const result = await documentationService.getArticles();

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-articles', undefined);

      // Check result was normalized correctly
      expect(result).toEqual([
        {
          id: '1',
          title: 'Introduction',
          slug: 'introduction',
          content: 'Welcome to the documentation',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        },
        {
          id: '2',
          title: 'Configuration',
          slug: 'configuration',
          content: 'How to configure the application',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        }
      ]);
    });
    
    it('should get articles by category and normalize the response', async () => {
      const mockArticlesResponse = {
        data: [
          {
            id: '1',
            attributes: {
              title: 'Introduction',
              slug: 'introduction',
              content: 'Welcome to the documentation',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          },
          {
            id: '2',
            attributes: {
              title: 'Configuration',
              slug: 'configuration',
              content: 'How to configure the application',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          }
        ],
        meta: { pagination: { page: 1, pageSize: 25, total: 2 } }
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockArticlesResponse);

      const result = await documentationService.getArticlesByCategory('1');

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-articles', {
        filters: { categoryId: '1' },
        sort: 'updatedAt:desc',
      });

      // Check result was normalized correctly
      expect(result).toEqual([
        {
          id: '1',
          title: 'Introduction',
          slug: 'introduction',
          content: 'Welcome to the documentation',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        },
        {
          id: '2',
          title: 'Configuration',
          slug: 'configuration',
          content: 'How to configure the application',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        }
      ]);
    });
    
    it('should get articles by category slug and normalize the response', async () => {
      const mockCategoryResponse = {
        data: [
          {
            id: '1',
            attributes: { title: 'Getting Started', slug: 'getting-started', order: 1 }
          }
        ]
      };

      const mockArticlesResponse = {
        data: [
          {
            id: '1',
            attributes: {
              title: 'Introduction',
              slug: 'introduction',
              content: 'Welcome to the documentation',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          },
          {
            id: '2',
            attributes: {
              title: 'Configuration',
              slug: 'configuration',
              content: 'How to configure the application',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          }
        ],
        meta: { pagination: { page: 1, pageSize: 25, total: 2 } }
      };

      jest.spyOn(documentationService as any, 'get')
        .mockResolvedValueOnce(mockCategoryResponse)
        .mockResolvedValueOnce(mockArticlesResponse);

      const result = await documentationService.getArticlesByCategorySlug('getting-started');

      // Check correct endpoints were called
      expect((documentationService as any).get).toHaveBeenNthCalledWith(1, 'documentation-categories', {
        filters: { slug: 'getting-started' },
      });

      expect((documentationService as any).get).toHaveBeenNthCalledWith(2, 'documentation-articles', {
        filters: { categoryId: '1' },
        sort: 'updatedAt:desc',
      });

      // Check result was normalized correctly
      expect(result).toEqual([
        {
          id: '1',
          title: 'Introduction',
          slug: 'introduction',
          content: 'Welcome to the documentation',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        },
        {
          id: '2',
          title: 'Configuration',
          slug: 'configuration',
          content: 'How to configure the application',
          category: {
            data: {
              id: '1',
              attributes: {
                title: 'Getting Started',
                slug: 'getting-started'
              }
            }
          }
        }
      ]);
    });
    
    it('should get an article by ID and normalize the response', async () => {
      const mockArticleResponse = {
        data: {
          id: '1',
          attributes: {
            title: 'Introduction',
            slug: 'introduction',
            content: 'Welcome to the documentation',
            category: {
              data: {
                id: '1',
                attributes: {
                  title: 'Getting Started',
                  slug: 'getting-started'
                }
              }
            }
          }
        }
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockArticleResponse);

      const result = await documentationService.getArticleById('1');

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-articles/1');

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        title: 'Introduction',
        slug: 'introduction',
        content: 'Welcome to the documentation',
        category: {
          data: {
            id: '1',
            attributes: {
              title: 'Getting Started',
              slug: 'getting-started'
            }
          }
        }
      });
    });
    
    it('should get an article by slug and normalize the response', async () => {
      const mockArticleResponse = {
        data: [
          {
            id: '1',
            attributes: {
              title: 'Introduction',
              slug: 'introduction',
              content: 'Welcome to the documentation',
              category: {
                data: {
                  id: '1',
                  attributes: {
                    title: 'Getting Started',
                    slug: 'getting-started'
                  }
                }
              }
            }
          }
        ]
      };

      jest.spyOn(documentationService as any, 'get').mockResolvedValue(mockArticleResponse);

      const result = await documentationService.getArticleBySlug('introduction');

      // Check correct endpoint was called
      expect((documentationService as any).get).toHaveBeenCalledWith('documentation-articles', {
        filters: { slug: 'introduction' },
      });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        title: 'Introduction',
        slug: 'introduction',
        content: 'Welcome to the documentation',
        category: {
          data: {
            id: '1',
            attributes: {
              title: 'Getting Started',
              slug: 'getting-started'
            }
          }
        }
      });
    });
    
    it('should create an article and normalize the response', async () => {
      const articleData = {
        title: 'New Article',
        slug: 'new-article',
        content: 'New article content',
        categoryId: '1'
      };

      const mockArticleResponse = {
        data: {
          id: '3',
          attributes: {
            title: 'New Article',
            slug: 'new-article',
            content: 'New article content',
            category: {
              data: {
                id: '1',
                attributes: {
                  title: 'Getting Started',
                  slug: 'getting-started'
                }
              }
            }
          }
        }
      };

      jest.spyOn(documentationService as any, 'post').mockResolvedValue(mockArticleResponse);

      const result = await documentationService.createArticle(articleData);

      // Check correct endpoint was called
      expect((documentationService as any).post).toHaveBeenCalledWith('documentation-articles', { data: articleData });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '3',
        title: 'New Article',
        slug: 'new-article',
        content: 'New article content',
        category: {
          data: {
            id: '1',
            attributes: {
              title: 'Getting Started',
              slug: 'getting-started'
            }
          }
        }
      });
    });
    
    it('should update an article and normalize the response', async () => {
      const articleData = {
        title: 'Updated Article',
        slug: 'updated-article',
        content: 'Updated article content',
        categoryId: '1'
      };

      const mockArticleResponse = {
        data: {
          id: '1',
          attributes: {
            title: 'Updated Article',
            slug: 'updated-article',
            content: 'Updated article content',
            category: {
              data: {
                id: '1',
                attributes: {
                  title: 'Getting Started',
                  slug: 'getting-started'
                }
              }
            }
          }
        }
      };

      jest.spyOn(documentationService as any, 'put').mockResolvedValue(mockArticleResponse);

      const result = await documentationService.updateArticle('1', articleData);

      // Check correct endpoint was called
      expect((documentationService as any).put).toHaveBeenCalledWith('documentation-articles/1', { data: articleData });

      // Check result was normalized correctly
      expect(result).toEqual({
        id: '1',
        title: 'Updated Article',
        slug: 'updated-article',
        content: 'Updated article content',
        category: {
          data: {
            id: '1',
            attributes: {
              title: 'Getting Started',
              slug: 'getting-started'
            }
          }
        }
      });
    });
    
    it('should delete an article', async () => {
      jest.spyOn(documentationService as any, 'delete').mockResolvedValue({});

      await documentationService.deleteArticle('1');

      // Check correct endpoint was called
      expect((documentationService as any).delete).toHaveBeenCalledWith('documentation-articles/1');
    });
  });
}); 