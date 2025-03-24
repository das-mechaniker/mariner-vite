// Export all API services

// Base service with types
export * from './base';

// Auth service
export { authService } from './authService';

// Content type specific services
export { userService } from './userService';
export { agentService } from './agentService';
export { documentationService } from './documentationService';
export { researchLabService } from './researchLabService';
export { promptLibraryService } from './promptLibraryService';

// Initialize auth on module import
import { authService } from './authService';
authService.initAuth(); 