import { BaseApiService } from './base';
import { 
  DocumentationCategory, 
  DocumentationArticle, 
  normalizeStrapiCollection, 
  normalizeStrapiEntity 
} from '../../types/api';

export class DocumentationService extends BaseApiService {
  private readonly categoryEndpoint = 'documentation-categories';
  private readonly articleEndpoint = 'documentation-articles';

  // Category methods
  /**
   * Get all documentation categories
   */
  async getCategories(query?: Record<string, any>): Promise<DocumentationCategory[]> {
    const response = await this.get<any>(this.categoryEndpoint, {
      sort: 'order:asc',
      ...query,
    });
    return normalizeStrapiCollection<DocumentationCategory>(response);
  }

  /**
   * Get a category by ID
   */
  async getCategoryById(id: string): Promise<DocumentationCategory> {
    const response = await this.get<any>(`${this.categoryEndpoint}/${id}`);
    return normalizeStrapiEntity<DocumentationCategory>(response);
  }

  /**
   * Get a category by slug
   */
  async getCategoryBySlug(slug: string): Promise<DocumentationCategory> {
    const response = await this.get<any>(this.categoryEndpoint, {
      filters: { slug },
    });
    const categories = normalizeStrapiCollection<DocumentationCategory>(response);
    if (categories.length === 0) {
      throw new Error(`Category with slug "${slug}" not found`);
    }
    return categories[0];
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData: Partial<DocumentationCategory>): Promise<DocumentationCategory> {
    const response = await this.post<any>(this.categoryEndpoint, { data: categoryData });
    return normalizeStrapiEntity<DocumentationCategory>(response);
  }

  /**
   * Update an existing category
   */
  async updateCategory(id: string, categoryData: Partial<DocumentationCategory>): Promise<DocumentationCategory> {
    const response = await this.put<any>(`${this.categoryEndpoint}/${id}`, { data: categoryData });
    return normalizeStrapiEntity<DocumentationCategory>(response);
  }

  /**
   * Delete a category
   */
  async deleteCategory(id: string): Promise<void> {
    await this.delete(`${this.categoryEndpoint}/${id}`);
  }

  // Article methods
  /**
   * Get all articles
   */
  async getArticles(query?: Record<string, any>): Promise<DocumentationArticle[]> {
    const response = await this.get<any>(this.articleEndpoint, query);
    return normalizeStrapiCollection<DocumentationArticle>(response);
  }

  /**
   * Get articles by category
   */
  async getArticlesByCategory(categoryId: string): Promise<DocumentationArticle[]> {
    const response = await this.get<any>(this.articleEndpoint, {
      filters: { categoryId },
      sort: 'updatedAt:desc',
    });
    return normalizeStrapiCollection<DocumentationArticle>(response);
  }

  /**
   * Get articles by category slug
   */
  async getArticlesByCategorySlug(slug: string): Promise<DocumentationArticle[]> {
    // First get the category by slug
    const category = await this.getCategoryBySlug(slug);
    // Then get articles by category ID
    return this.getArticlesByCategory(category.id);
  }

  /**
   * Get an article by ID
   */
  async getArticleById(id: string): Promise<DocumentationArticle> {
    const response = await this.get<any>(`${this.articleEndpoint}/${id}`);
    return normalizeStrapiEntity<DocumentationArticle>(response);
  }

  /**
   * Get an article by slug
   */
  async getArticleBySlug(slug: string): Promise<DocumentationArticle> {
    const response = await this.get<any>(this.articleEndpoint, {
      filters: { slug },
    });
    const articles = normalizeStrapiCollection<DocumentationArticle>(response);
    if (articles.length === 0) {
      throw new Error(`Article with slug "${slug}" not found`);
    }
    return articles[0];
  }

  /**
   * Create a new article
   */
  async createArticle(articleData: Partial<DocumentationArticle>): Promise<DocumentationArticle> {
    const response = await this.post<any>(this.articleEndpoint, { data: articleData });
    return normalizeStrapiEntity<DocumentationArticle>(response);
  }

  /**
   * Update an existing article
   */
  async updateArticle(id: string, articleData: Partial<DocumentationArticle>): Promise<DocumentationArticle> {
    const response = await this.put<any>(`${this.articleEndpoint}/${id}`, { data: articleData });
    return normalizeStrapiEntity<DocumentationArticle>(response);
  }

  /**
   * Delete an article
   */
  async deleteArticle(id: string): Promise<void> {
    await this.delete(`${this.articleEndpoint}/${id}`);
  }

  /**
   * Search articles by title or content
   */
  async searchArticles(query: string): Promise<DocumentationArticle[]> {
    const response = await this.get<any>(this.articleEndpoint, {
      filters: {
        $or: [
          { title: { $containsi: query } },
          { content: { $containsi: query } },
          { summary: { $containsi: query } },
        ],
        published: true,
      },
    });
    return normalizeStrapiCollection<DocumentationArticle>(response);
  }
}

// Export a singleton instance
export const documentationService = new DocumentationService(); 