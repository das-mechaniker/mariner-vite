// Common types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
}

export interface BaseTimeStampedEntity {
  createdAt: string;
  updatedAt: string;
}

// Auth types
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

// Agent types
export interface Capability {
  id: string;
  name: string;
  description: string;
}

export interface Agent extends BaseTimeStampedEntity {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  modelId: string;
  color: string;
  capabilities: Capability[];
  usageCount: number;
  lastUsed: string;
  isFavorite: boolean;
  isPublic: boolean;
  createdBy?: User;
}

// Documentation types
export interface DocumentReference {
  title: string;
  link: string;
}

export interface DocumentationCategory extends BaseTimeStampedEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  viewAllLink: string;
  documents: DocumentReference[];
}

export interface DocumentationArticle extends BaseTimeStampedEntity {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  content: string;
  summary: string;
  published: boolean;
  publishedAt?: string;
  author?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

// Research Lab types
export interface Tool {
  id: string;
  name: string;
  description: string;
}

export interface ResearchLab extends BaseTimeStampedEntity {
  id: string;
  name: string;
  description: string;
  icon: string;
  tools: Tool[];
  isPublic: boolean;
  createdBy?: User;
}

// Prompt Library types
export interface PromptTag {
  id: string;
  name: string;
}

export interface Prompt extends BaseTimeStampedEntity {
  id: string;
  title: string;
  promptText: string;
  category: string;
  tags: PromptTag[];
  isFavorite?: boolean;
}

// Strapi response format adapters
// These helpers transform Strapi's data structure to our app's expected format

export interface StrapiAttribute<T> {
  data: {
    id: string;
    attributes: T;
  } | {
    id: string;
    attributes: T;
  }[] | null;
}

export interface StrapiRelation<T> {
  data: {
    id: string;
    attributes: T;
  } | {
    id: string;
    attributes: T;
  }[] | null;
}

// Function to normalize Strapi single entity response to our format
export function normalizeStrapiEntity<T>(
  response: { data: { id: string; attributes: any } }, 
  transformFn?: (data: any) => T
): T {
  const { id } = response.data;
  const attributes = response.data.attributes;
  
  // Create a base object with id and all attributes
  const normalizedData = { id, ...attributes };
  
  // Apply custom transformation if provided
  return transformFn ? transformFn(normalizedData) : normalizedData as T;
}

// Function to normalize Strapi collection response to our format
export function normalizeStrapiCollection<T>(
  response: { data: { id: string; attributes: any }[] },
  transformFn?: (data: any) => T
): T[] {
  return response.data.map(item => {
    const { id } = item;
    const attributes = item.attributes;
    
    // Create a base object with id and all attributes
    const normalizedData = { id, ...attributes };
    
    // Apply custom transformation if provided
    return transformFn ? transformFn(normalizedData) : normalizedData as T;
  });
} 