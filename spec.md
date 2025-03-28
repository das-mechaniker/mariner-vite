Below is a consolidated **Phase 1** specification for Project Mariner’s proof of concept (POC), reflecting all the requirements and decisions made during our iterative discussions. This document is designed to give developers a clear roadmap for implementing a performant, scalable, and enterprise-friendly React + Strapi application.

---

## 1. Introduction

**Project Mariner** is a platform intended to centralize AI resources for investment professionals. This Phase 1 POC will focus on building a robust front end in React (with Tailwind CSS and a custom color palette) and a simple open-source Strapi backend (Community Edition) for content management. We’ll emphasize modular architecture, maintainability, and performance, while deferring advanced authentication, chat functionality, and enterprise-level backend features to later phases.

---

## 2. High-Level Requirements

1. **Front End:**
   - **React** (no Next.js) with minimal external dependencies for optimal performance.
   - **Tailwind CSS** for styling, combined with a custom color palette.
   - **Persistent sidebar** navigation and **breadcrumb** component at the top.
   - **Homepage** that provides an immediate entry point to main sections and a placeholder for initiating a chat.
   - **Agent Library** in a card-based UI with search, filter, and favorite functionality.
   - **Documentation Center** with category-based browsing and search.
   - **Education Hub** linking to external learning resources.
   - **Research Labs** linking to external POCs/apps.
   - **Prompt Library** with basic CRUD for prompts (name, category, tags, prompt text).

2. **Back End:**
   - **Open-source Strapi CMS** (Community Edition) to handle CRUD operations for:
     - Users
     - Agents
     - Documentation categories/articles
     - Research labs
     - Prompt library items
   - Minimal or no advanced authentication for this POC.
   - Basic RESTful endpoints auto-generated by Strapi for each content type.

3. **Deployment & Architecture:**
   - **Containerization** with Docker:
     - Separate containers for the React front end and Strapi back end.
     - Docker Compose for orchestration.
   - Aim for a modular, scalable architecture that can easily be expanded in later phases.

4. **Testing & QA:**
   - Keep it simple but follow best practices.
   - Basic unit tests for front-end components (e.g., using Jest and React Testing Library).
   - Minimal end-to-end or integration tests if feasible (optional).

---

## 3. Architecture Overview

### 3.1 Front-End (React)

- **Framework**: React (CRA or Vite) with JavaScript or TypeScript (dev choice).
- **State Management**: A lightweight approach using React Context + Hooks or Redux Toolkit (developer preference). Keep it modular to allow easy expansion later.
- **Routing**: React Router for page navigation (Home, Agent Library, Documentation, Education, Research Labs, Prompt Library).
- **Styling**:
  - **Tailwind CSS** for utility-first styling.
  - **Custom color palette** integrated into `tailwind.config.js`.
  - Minimal external UI libraries to maintain performance and control over styling.

### 3.2 Back-End (Strapi CMS)

- **CMS**: Strapi (Community Edition) to define content types:
  1. **Users** (for demonstration; no advanced auth needed).
  2. **Agents** (name, description, category, icon, capabilities, usage stats).
  3. **Documentation** (categories and articles).
  4. **Research Labs** (basic info, external links to POCs).
  5. **Prompt Library** (title, text, category, tags).
- **Database**: Can be SQLite for local POC or PostgreSQL/MySQL if needed for containerization.
- **RESTful Endpoints**: Auto-generated by Strapi for each content type.
- **Security**: Minimal out-of-the-box Strapi authentication. No advanced RBAC or single sign-on in Phase 1.

### 3.3 Containerization

- **Dockerfiles**:
  - One Dockerfile for the React front end (serving a static build via something like NGINX).
  - One Dockerfile for the Strapi back end.
- **Docker Compose**:
  - Defines services for `frontend` and `backend`.
  - Could also define a service for a database if not using SQLite.

---

## 4. Data Handling & Models

Below is a summary of key data models (mirroring the mock JSON structure):

1. **Users**  
   - **Fields**: `id`, `email`, `firstName`, `lastName`, `role`, `avatarUrl`  
   - **Phase 1**: Minimal usage; no complex role-based logic.

2. **Agents**  
   - **Fields**: `id`, `name`, `description`, `category`, `icon`, `modelId`, `color`, `capabilities[]`, `usageCount`, `lastUsed`, `isFavorite`, `isPublic`  
   - **CRUD**: Basic create/read/update/delete in Strapi.  

3. **Documentation**  
   - **Categories**: `id`, `name`, `slug`, `description`, `icon`, `order`, `documents[]`  
   - **Articles**: `id`, `title`, `slug`, `content`, `category`, `summary`, `published`, `author`, `createdAt`, `updatedAt`  

4. **Research Labs**  
   - **Fields**: `id`, `name`, `description`, `icon`, `tools[]`, `isPublic`, `createdBy`, `createdAt`, `updatedAt`  
   - Typically link out to external POCs or apps.

5. **Prompt Library**  
   - **Fields**: `id`, `title`, `promptText`, `category`, `tags[]`, `createdAt`, `updatedAt`  
   - Minimal phase 1 approach: Basic CRUD in Strapi, displayed in a card-based UI.

6. **Misc.**  
   - **Recent Documents** or other ephemeral data can be stored similarly or mocked if needed.

---

## 5. UI/UX Structure

### 5.1 Layout

- **Persistent Sidebar** on the left for core navigation:
  1. **Home**
  2. **Education**
  3. **Documentation**
  4. **Agent Library**
  5. **Labs**
  6. **Prompt Library**
  7. (Optionally) **Chat** placeholder

- **Breadcrumb** at the top to reflect current path (e.g., Home > Agent Library > “Portfolio Analyzer”).

### 5.2 Homepage

- **Welcome section**: “Welcome to Project Mariner” with subtext.
- **Quick links**: Large tiles or cards that lead to:
  1. AI Chat (placeholder for now)
  2. Agent Library
  3. Documentation Center
  4. Research Labs
  5. Prompt Library
  6. Education Hub
- **Chat input**: A simple text field that doesn’t fully implement chat logic in Phase 1 (placeholder).

### 5.3 Agent Library

- **Grid of Agent Cards**: Each card shows:
  - Icon, name, category
  - Brief description
  - Key metrics: usage count, last used
  - “Favorite” toggle
- **Search/Filter** by category or name.
- **Agent Detail**: Modal or side panel with expanded description, capabilities list, creation details, usage stats, and launch button (mock).

### 5.4 Documentation Center

- **Categories**: Displayed in a structured layout with icons and short descriptions.
- **Search**: Basic text search across article titles or content.
- **Article View**: Full markdown or rich text rendering of the documentation article.

### 5.5 Education Hub

- **List of resources**: Basic text + external links (e.g., LinkedIn Learning).
- **Course details**: Possibly a short description and link out to external platform.

### 5.6 Research Labs

- **Lab Cards**: Each lab has a name, icon, description, and links to external POCs.
- **Phase 1**: Just store the data in Strapi, link out to external tools.

### 5.7 Prompt Library

- **Card-based Layout**: Each prompt card has a title, short description/tags, and a copy button for quick usage.
- **Search & Filter**: By category or tags.
- **Create/Edit Prompt**: Simple forms with fields for title, prompt text, tags, and category.

---

## 6. Error Handling Strategies

### 6.1 Front End

- **Global Error Boundary**: Capture React runtime errors and display a fallback UI.
- **API Error Handling**: Use `try/catch` blocks (or interceptors if using Axios/fetch) to catch Strapi API errors. Show user-friendly notifications or messages.

### 6.2 Back End (Strapi)

- **Default Strapi Error Handling**: Return standard HTTP status codes (`400`, `404`, `500`, etc.).
- **Minimal Logging**: Strapi logs to console by default; no advanced log aggregation in Phase 1.

---

## 7. Testing Plan

### 7.1 Front End

- **Unit Tests**: 
  - **React Testing Library** + **Jest** to test components (AgentCard, PromptCard, Layout, etc.).
  - Minimal coverage to ensure components render correctly and handle props/state.
- **Integration Tests** (Optional):
  - Could use something like Cypress or Playwright for a smoke test to confirm that major pages load and data fetches from Strapi.

### 7.2 Back End

- **Strapi Out-of-the-Box**: 
  - Minimal testing needed for the auto-generated endpoints. 
  - Optionally, write a few Jest tests for custom logic (if any) in the Strapi code.

---

## 8. Future Expansion (Phase 2+)

- **Advanced Chat UI** with conversation threading, persistent history, and real LLM integration.
- **Enterprise Auth** (SSO, RBAC, or other advanced security features).
- **Analytics & Usage Tracking** for prompts, agents, and documentation usage.
- **Role-Based Permissions** in Strapi or a custom backend solution.
- **Versioning & Collaboration** in the Prompt Library.
- **Performance Benchmarking** and load testing.
- **Continuous Integration/Delivery** with advanced pipelines.

---

## 9. Conclusion

This Phase 1 specification provides a clear, developer-ready outline for implementing Project Mariner’s proof of concept. By focusing on a clean, modular React front end, a straightforward Strapi backend, and containerized deployment, we ensure a scalable and maintainable foundation. Future enhancements—such as advanced chat, enterprise-grade authentication, and analytics—can be layered on top of this architecture in subsequent phases.

**Next Steps for Developers:**

1. **Set up Strapi**:
   - Create content types for Users, Agents, Documentation, Research Labs, Prompts.
   - Configure Dockerfile and `docker-compose.yml` to containerize Strapi.
   - Optionally set up SQLite or a lightweight DB for local development.

2. **Initialize React Project**:
   - Create a React app (CRA or Vite) with Tailwind CSS.
   - Configure the custom color palette in `tailwind.config.js`.
   - Implement the layout (sidebar, breadcrumbs), homepage, and the key modules (Agent Library, Documentation, Prompt Library, etc.).

3. **Wire Up API Calls**:
   - Use REST endpoints auto-generated by Strapi for fetching data.
   - Implement minimal error handling in front-end service calls.

4. **Add Basic Tests**:
   - Write unit tests for main components.
   - Optionally add a few integration tests.

By adhering to these guidelines, you’ll have a polished, best-practice POC that can easily evolve into a production-ready, enterprise-class application in future phases.