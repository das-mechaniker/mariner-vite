# Mariner - Modern React + TypeScript Application

![Mariner](public/vite.svg)

Mariner is a modern, responsive web application built with React, TypeScript, and Vite, featuring a feature-rich UI with a Strapi CMS backend.

## Features

- 🚀 Built with **React 18**, **TypeScript**, and **Vite** for lightning-fast development and performance
- 📱 Fully responsive design that works across all device sizes
- 🎨 Styled with **Tailwind CSS** for rapid UI development
- 🧭 Modern sidebar navigation with search functionality
- 💬 Interactive chat component
- 🤖 Agent management system
- 📝 Documentation system with categories and articles
- 🔍 Enterprise search functionality
- 🧪 Testing with **Jest** and **React Testing Library**
- 🔧 Configured with **ESLint** and **Prettier** for code quality

## Project Structure

```
mariner-vite/
├── public/                # Static assets
├── src/
│   ├── api/               # API integration code
│   ├── assets/            # Project assets (images, fonts, etc.)
│   ├── bootstrap/         # Application bootstrap code
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Application pages
│   ├── services/          # Service layer for API communication
│   ├── tests/             # Test files
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── ...
├── strapi-backend/        # Strapi CMS backend
│   ├── src/
│   │   ├── api/           # API definitions
│   │   ├── seeds/         # Database seed scripts
│   │   └── ...
│   ├── config/            # Strapi configuration
│   ├── database/          # Database files (SQLite)
│   └── ...
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/das-mechaniker/mariner-vite.git
   cd mariner-vite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Backend Setup (Strapi CMS)

1. Navigate to the Strapi backend directory:
   ```bash
   cd strapi-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Rebuild native modules if needed:
   ```bash
   npm rebuild
   ```

4. Start the Strapi development server:
   ```bash
   npm run develop
   ```

5. Access the Strapi admin panel at `http://localhost:1337/admin`

6. Create an admin user when prompted

## Content Types

The application includes the following content types in the Strapi backend:

- **User**: Application users with roles and permissions
- **Agent**: AI agents with capabilities and properties
- **Documentation Category**: Categories for organizing documentation
- **Documentation Article**: Articles containing documentation content
- **Research Lab**: For research and experimentation features
- **Prompt**: Predefined prompts for AI interactions
- **Capability**: Specific capabilities that agents can have

## Available Scripts

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run test` - Run tests with Jest
- `npm run test:watch` - Run tests in watch mode
- `npm run format` - Format code with Prettier

### Backend (Strapi)

- `npm run develop` - Start the Strapi development server
- `npm run start` - Start the Strapi server in production mode
- `npm run build` - Build the Strapi admin panel for production
- `npm run strapi` - Run Strapi CLI commands

## Technologies

- **Frontend**:
  - React 18
  - TypeScript
  - Vite
  - React Router
  - Tailwind CSS
  - Lucide Icons
  - Jest & React Testing Library

- **Backend**:
  - Strapi CMS
  - SQLite Database (development)
  - Node.js

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Strapi](https://strapi.io/)
- [Lucide Icons](https://lucide.dev/)
