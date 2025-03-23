# Project Mariner: Incremental Development Blueprint

Based on the provided specification for Project Mariner, I've developed a detailed, step-by-step implementation plan broken down into manageable chunks for test-driven development. Each step builds on the previous one, ensuring incremental progress while maintaining best practices.

## Blueprint Overview

The implementation strategy follows these major phases:

1. **Project Setup & Infrastructure**
2. **Core UI Components & Navigation**
3. **Strapi Backend & Content Types**
4. **Feature Implementation (Homepage, Agent Library, etc.)**
5. **Integration & Testing**
6. **Containerization & Deployment**

## Detailed Implementation Prompts

### Prompt 1: Project Initialization & Configuration

```
I'm building a React application called "Project Mariner" that centralizes AI resources for investment professionals. Please help me set up the initial project structure:

1. Initialize a new Vite React project with TypeScript
2. Configure ESLint and Prettier with best practices
3. Set up Jest and React Testing Library for unit testing
4. Configure Tailwind CSS with the following custom color palette:
   - primary: #0056b3
   - secondary: #6c757d
   - accent: #17a2b8
   - success: #28a745
   - warning: #ffc107
   - danger: #dc3545
   - light: #f8f9fa
   - dark: #343a40

Create the following initial folder structure:
- src/
  - components/
    - layout/
    - common/
  - pages/
  - hooks/
  - services/
  - types/
  - utils/
  - tests/
    - setup.ts

Please provide all necessary configuration files and a basic App.tsx and index.tsx. Include a simple test to verify the testing setup is working properly.
```

### Prompt 2: Layout & Navigation Components

```
Building on our Project Mariner React application, let's implement the core layout and navigation components:

1. Create a persistent Sidebar component with the following navigation items:
   - Home
   - Education
   - Documentation
   - Agent Library
   - Labs
   - Prompt Library
   - Chat (placeholder)

2. Implement a Breadcrumb component that reflects the current path.

3. Create a main Layout component that combines:
   - The Sidebar
   - A top navigation bar with the Breadcrumb component
   - A main content area

4. Set up React Router with routes for each main section.

For each component:
- Write unit tests to verify rendering and behavior
- Use Tailwind CSS for styling
- Make the layout responsive
- Implement active state styling for the current route in the Sidebar

Please provide the TypeScript interfaces, component implementations, and test files.
```

### Prompt 3: Strapi Setup & Initial Content Types

```
For Project Mariner, I need to set up the Strapi backend. Please help me with:

1. Initialize a new Strapi project (Community Edition) with:
   - TypeScript support
   - SQLite database for local development

2. Define the User content type with the following fields:
   - email (string, required, unique)
   - firstName (string, required)
   - lastName (string, required)
   - role (enumeration: admin, user)
   - avatarUrl (string)

3. Define the Agent content type with:
   - name (string, required)
   - description (text, required)
   - category (string, required)
   - icon (string)
   - modelId (string)
   - color (string)
   - capabilities (json)
   - usageCount (integer)
   - lastUsed (datetime)
   - isFavorite (boolean)
   - isPublic (boolean)

4. Create a basic permission setup that allows public access to read these content types (for POC purposes).

5. Create a seed script to populate some initial data for each content type.

Please provide the necessary Strapi configuration files, content type definitions, and seed scripts.
```

### Prompt 4: More Strapi Content Types

```
Continuing with our Project Mariner Strapi backend, let's implement the remaining content types:

1. Define the Documentation content types:
   - Documentation Category:
     - name (string, required)
     - slug (string, required, unique)
     - description (text)
     - icon (string)
     - order (integer)
   - Documentation Article:
     - title (string, required)
     - slug (string, required, unique)
     - content (richtext, required)
     - category (relation to Documentation Category)
     - summary (text)
     - published (boolean)
     - author (relation to User)

2. Define the Research Lab content type:
   - name (string, required)
   - description (text, required)
   - icon (string)
   - tools (json)
   - isPublic (boolean)
   - createdBy (relation to User)

3. Define the Prompt Library content type:
   - title (string, required)
   - promptText (text, required)
   - category (string)
   - tags (json)

4. Update the permissions to allow public read access to these new content types.

5. Extend the seed script to include sample data for these new content types.

Please provide the content type definitions, updated permission configurations, and additional seed data.
```

### Prompt 5: API Service Layer

```
For Project Mariner, let's create a service layer to interact with our Strapi API:

1. Create a base API service with:
   - Configuration for base URL
   - Methods for handling GET, POST, PUT, DELETE requests
   - Error handling
   - Response type definitions

2. Implement specific service modules for each content type:
   - UserService
   - AgentService
   - DocumentationService
   - ResearchLabService
   - PromptLibraryService

3. Add type definitions for all API responses.

4. Implement a custom hook (useApi) to simplify API calls from components.

5. Write tests for the API services using mock data.

All services should follow a consistent pattern and provide type safety. Include error handling and loading states in the hooks.

Please provide the TypeScript implementations and corresponding tests.
```

### Prompt 6: Homepage Implementation

```
Let's implement the Homepage for Project Mariner:

1. Create a HomePage component with:
   - A welcome section with title "Welcome to Project Mariner" and a brief description
   - A grid of quick-link cards to main sections (Agent Library, Documentation, etc.)
   - A placeholder for the chat input at the bottom

2. Implement a QuickLinkCard component that displays:
   - An icon
   - A title
   - A brief description
   - A "Go to" button

3. Create a simple ChatInputPlaceholder component.

4. Write tests for all components.

5. Update the routing configuration to set the Homepage as the default route.

Use Tailwind CSS for styling and ensure the page is responsive. The quick-link cards should be in a responsive grid layout that adapts to different screen sizes.

Please provide the TypeScript implementations, component tests, and any necessary updates to existing files.
```

### Prompt 7: Agent Library Basic Components

```
For Project Mariner's Agent Library, let's create the basic components:

1. Implement an AgentCard component that displays:
   - Icon and name
   - Category badge
   - Brief description (truncated if too long)
   - Usage count and last used date
   - Favorite toggle button

2. Create an AgentGrid component that:
   - Displays a grid of AgentCard components
   - Handles responsive layout

3. Implement a basic AgentLibraryPage with:
   - A header with title and description
   - The AgentGrid component
   - Placeholder for search/filter (we'll implement this functionality later)

4. Update the routing to include the AgentLibraryPage.

5. Connect the AgentLibraryPage to the AgentService to fetch and display real data.

6. Write tests for all components.

Focus on clean, maintainable code and ensure that each component is properly typed with TypeScript interfaces. Use the AgentService created earlier to fetch data.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 8: Agent Library Search and Detail View

```
Let's enhance the Agent Library with search, filtering, and a detail view:

1. Implement an AgentSearch component with:
   - Search input for name
   - Category filter dropdown
   - "Favorites only" toggle

2. Create an AgentDetailView component that shows:
   - Full agent details (name, description, category, etc.)
   - Complete capabilities list
   - Usage statistics
   - A "Launch" button (non-functional in Phase 1)

3. Implement a modal or slide-over panel to display the AgentDetailView when an AgentCard is clicked.

4. Update the AgentLibraryPage to:
   - Include the AgentSearch component
   - Filter agents based on search criteria
   - Open the AgentDetailView when an agent is selected

5. Add functionality to the "Favorite" toggle on the AgentCard to update the favorite status via the API.

6. Write tests for all new components and updated functionality.

Ensure the search and filtering happen client-side for this POC and that the favorite toggle updates the data in Strapi.

Please provide the TypeScript implementations and tests for all components and functionality.
```

### Prompt 9: Documentation Center Implementation

```
Let's implement the Documentation Center for Project Mariner:

1. Create a DocumentationCategoryCard component that displays:
   - Icon and name
   - Brief description
   - Number of articles in the category

2. Implement a DocumentationCategoriesGrid component that displays a grid of categories.

3. Create an ArticleView component that renders:
   - Article title
   - Metadata (author, date)
   - Content (with Markdown or rich text rendering)
   - Back to categories button

4. Implement a DocumentationSearchBar component.

5. Create a DocumentationPage that:
   - Shows the categories grid by default
   - Displays the ArticleView when an article is selected
   - Includes the search bar
   - Filters articles based on search criteria

6. Connect the DocumentationPage to the DocumentationService to fetch categories and articles.

7. Update the routing to support:
   - /documentation (categories view)
   - /documentation/category/:slug (articles in a category)
   - /documentation/article/:slug (specific article view)

8. Write tests for all components.

Focus on clean rendering of Markdown/rich text content and proper navigation between views.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 10: Education Hub Implementation

```
For Project Mariner's Education Hub, let's implement:

1. Create an EducationResourceCard component that displays:
   - Resource title
   - Brief description
   - Source/platform (e.g., LinkedIn Learning)
   - External link icon

2. Implement an EducationResourceGrid component that displays a grid of resources.

3. Create an EducationPage that:
   - Shows a welcome message and description
   - Displays the EducationResourceGrid
   - Includes a simple filter by source/platform

4. Add handling for external links with:
   - Visual indication that links open in a new tab
   - Proper security attributes (rel="noopener noreferrer")

5. Create a mock service that returns education resources (since these are external links, they don't need to be in Strapi).

6. Update the routing configuration for the Education Hub.

7. Write tests for all components.

Since this section primarily links to external resources, focus on clear presentation and proper external link handling.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 11: Research Labs Implementation

```
Let's implement the Research Labs section for Project Mariner:

1. Create a LabCard component that displays:
   - Lab name and icon
   - Description
   - Available tools (displayed as tags/badges)
   - "Open Lab" button for external linking

2. Implement a LabGrid component that displays a grid of research labs.

3. Create a ResearchLabsPage that:
   - Shows a welcome message explaining the purpose of Research Labs
   - Displays the LabGrid component
   - Includes a simple filter to show public/private labs

4. Connect the ResearchLabsPage to the ResearchLabService to fetch lab data.

5. Add proper external link handling for the "Open Lab" button.

6. Update the routing configuration for Research Labs.

7. Write tests for all components.

Since Research Labs link to external tools/POCs, focus on clear presentation and proper external link handling.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 12: Prompt Library Implementation

```
For Project Mariner's Prompt Library, let's implement:

1. Create a PromptCard component that displays:
   - Prompt title
   - Category and tags
   - Preview of the prompt text (truncated)
   - Copy button to copy the full prompt text
   - Edit and Delete buttons

2. Implement a PromptGrid component that displays a grid of prompts.

3. Create a PromptForm component for adding/editing prompts with:
   - Title input
   - Category selection
   - Tags input (with add/remove functionality)
   - Prompt text textarea
   - Save and Cancel buttons

4. Implement a PromptLibraryPage that:
   - Shows a header with description and "Add Prompt" button
   - Displays the PromptGrid component
   - Includes search and filter functionality
   - Opens the PromptForm in a modal/slide-over when adding/editing
   - Confirms before deleting prompts

5. Connect the PromptLibraryPage to the PromptLibraryService for CRUD operations.

6. Add a copy-to-clipboard functionality for prompt texts.

7. Update the routing configuration for the Prompt Library.

8. Write tests for all components and functionality.

Focus on the CRUD operations and ensuring the form validation works correctly.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 13: Error Handling and Loading States

```
Let's implement consistent error handling and loading states across Project Mariner:

1. Create reusable components:
   - LoadingSpinner component
   - ErrorMessage component
   - EmptyState component (for when lists are empty)

2. Implement a global error boundary component to catch React rendering errors.

3. Enhance the API service layer to:
   - Provide standardized error handling
   - Return loading states for async operations
   - Support request cancellation when components unmount

4. Create custom hooks for common data fetching patterns:
   - useQuery (for GET requests)
   - useMutation (for POST/PUT/DELETE requests)

5. Update all pages to use these hooks and display:
   - Loading spinners when data is being fetched
   - Error messages when API calls fail
   - Empty states when lists have no items

6. Add retry functionality to failed API requests.

7. Write tests for error scenarios and loading states.

Ensure consistent UX across the application for loading, errors, and empty states.

Please provide the TypeScript implementations and tests for all components and updated hooks.
```

### Prompt 14: Chat Placeholder Component

```
For Project Mariner, let's implement a placeholder for the future chat functionality:

1. Create a ChatPlaceholder component that:
   - Displays a simple input field with a send button
   - Shows a message that full chat functionality will be available in Phase 2
   - Has a placeholder for chat messages (static demo content)

2. Implement a ChatBubble component that displays:
   - Message text
   - Sender info (user or assistant)
   - Timestamp

3. Create a ChatInputField component with:
   - Text input
   - Send button
   - Basic validation (no empty messages)

4. Add a floating chat button in the bottom right corner of the application that:
   - Is visible on all pages
   - Opens a chat drawer/modal when clicked
   - Displays the ChatPlaceholder component

5. Write tests for all components.

Since this is just a placeholder for Phase 1, the components should be visually complete but without actual chat functionality.

Please provide the TypeScript implementations and tests for all components.
```

### Prompt 15: Global State Management

```
Let's implement global state management for Project Mariner:

1. Set up React Context API with:
   - AuthContext for user authentication state
   - UIContext for global UI state (sidebar collapse, theme, etc.)
   - NotificationContext for displaying toast messages

2. Create corresponding providers and hooks:
   - useAuth hook
   - useUI hook
   - useNotifications hook

3. Implement a NotificationSystem component that:
   - Displays toast messages
   - Supports different types (success, error, info, warning)
   - Auto-dismisses after a configurable timeout

4. Update the application to use these contexts:
   - Wrap the app with providers
   - Replace local state with context where appropriate
   - Add notifications for important actions (CRUD operations, errors)

5. Write tests for the contexts, providers, and notification system.

Since we're not implementing full authentication in Phase 1, the AuthContext will be minimal, but structured to support expansion in future phases.

Please provide the TypeScript implementations for the contexts, providers, hooks, and tests.
```

### Prompt 16: End-to-End Testing Setup

```
Let's set up end-to-end testing for Project Mariner:

1. Configure Cypress for end-to-end testing:
   - Install and configure Cypress
   - Set up TypeScript support
   - Configure base URL for local development

2. Implement basic smoke tests:
   - Verify that all main pages load
   - Check that navigation works
   - Ensure critical components are visible

3. Create tests for key user flows:
   - Browsing agents and viewing details
   - Navigating documentation categories and articles
   - Creating, editing, and deleting prompts

4. Set up a test environment in the Strapi backend:
   - Configure a test database
   - Create seed data specifically for testing

5. Implement custom Cypress commands for common operations.

Focus on critical user paths rather than trying to test everything. These E2E tests should complement, not replace, our unit tests.

Please provide the Cypress configuration, test implementations, and any necessary backend changes.
```

### Prompt 17: Dockerization - Frontend

```
Let's containerize the frontend of Project Mariner:

1. Create a Dockerfile for the React application:
   - Use a multi-stage build process
   - First stage for building the application
   - Second stage for serving the built files with NGINX

2. Configure NGINX:
   - Set up proper caching headers
   - Configure for single-page application routing
   - Implement security best practices (HTTPS redirect, security headers)

3. Create a .dockerignore file to exclude unnecessary files.

4. Implement environment variable handling:
   - Create a .env.example file with documentation
   - Set up environment variable substitution at runtime

5. Write a shell script for container initialization that:
   - Substitutes environment variables in the NGINX config
   - Validates required environment variables
   - Starts NGINX

The Dockerfile should follow best practices for security and optimization (minimal image size, non-root user, etc.).

Please provide the Dockerfile, NGINX configuration, .dockerignore, and initialization script.
```

### Prompt 18: Dockerization - Backend

```
Let's containerize the Strapi backend for Project Mariner:

1. Create a Dockerfile for the Strapi application:
   - Use Node.js as the base image
   - Configure for production use
   - Set up proper caching of node_modules

2. Configure environment variables:
   - Database connection
   - Admin credentials
   - API tokens
   - CORS settings

3. Create a .dockerignore file to exclude unnecessary files.

4. Set up a healthcheck endpoint for container orchestration.

5. Implement proper startup and shutdown handling.

6. Write a shell script for container initialization that:
   - Waits for the database to be available
   - Runs migrations if needed
   - Seeds initial data if the database is empty
   - Starts Strapi

The Dockerfile should follow best practices for security and optimization (minimal image size, non-root user, etc.).

Please provide the Dockerfile, .dockerignore, initialization script, and any necessary Strapi configuration changes.
```

### Prompt 19: Docker Compose Setup

```
Let's create a Docker Compose configuration for Project Mariner:

1. Create a docker-compose.yml file that defines:
   - Frontend service (React/NGINX)
   - Backend service (Strapi)
   - Database service (SQLite for development, or PostgreSQL/MySQL for production)
   - Volume mounts for persistent data
   - Environment variable configuration
   - Network configuration

2. Implement service dependencies and healthchecks.

3. Configure for both development and production environments:
   - Development mode with hot reloading
   - Production mode with optimized builds

4. Set up proper logging configuration.

5. Create a .env file for Docker Compose with appropriate defaults.

6. Write a README with instructions for:
   - Starting the application
   - Accessing the services
   - Common operations (backup, restore, logs)

The Docker Compose setup should be developer-friendly while also suitable for basic production deployments.

Please provide the docker-compose.yml, .env file, and README instructions.
```

### Prompt 20: Final Integration and Documentation

```
Let's finalize Project Mariner with comprehensive documentation and integration testing:

1. Create a main README.md with:
   - Project overview
   - Architecture diagram
   - Setup instructions
   - Development workflow
   - Testing strategy
   - Deployment guide

2. Implement a final integration test suite that:
   - Verifies all components work together
   - Tests critical user flows end-to-end
   - Validates Docker setup

3. Create documentation for future developers:
   - Code structure overview
   - Component library documentation
   - API documentation
   - State management patterns
   - Testing approach

4. Add JSDoc comments to key functions and components.

5. Create a CONTRIBUTING.md guide with:
   - Code style guide
   - Git workflow
   - Pull request process
   - Test requirements

6. Verify all tests are passing and fix any issues.

The goal is to ensure the project is well-documented, tested, and ready for future developers to extend in Phase 2.

Please provide the README.md, CONTRIBUTING.md, API documentation, and any other relevant documentation files.
```

## Implementation Strategy

This incremental approach:

1. **Starts with core infrastructure** - Setting up the development environment and essential components
2. **Builds features independently** - Each major section is developed and tested separately
3. **Integrates progressively** - Components are wired together as they're completed
4. **Emphasizes testing** - Tests are written alongside each component
5. **Follows best practices** - TypeScript, modular design, and clean architecture

Each prompt builds directly on previous work, ensuring no code is orphaned and the project evolves in a coherent, maintainable way.

The plan intentionally defers some complex features (like full chat functionality) to focus on creating a solid foundation for Phase 1, while structuring the code to accommodate these features in future phases.