import { Strapi } from '@strapi/strapi';

/**
 * Seed script for Project Mariner
 * This script populates the database with initial data for users and agents
 */

const mockUsers = [
  {
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin@example.com'
  },
  {
    email: 'editor@example.com',
    firstName: 'Editor',
    lastName: 'User',
    role: 'admin',
    avatarUrl: 'https://i.pravatar.cc/150?u=editor@example.com'
  },
  {
    email: 'user@example.com',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
    avatarUrl: 'https://i.pravatar.cc/150?u=user@example.com'
  }
];

const mockAgents = [
  {
    name: 'Portfolio Analyzer',
    description: 'Analyzes investment portfolios for risk, diversification, and performance',
    category: 'Portfolio Management',
    icon: 'Bot',
    modelId: 'gpt-4',
    color: 'bg-gradient-to-r from-wave-blue to-crest-blue',
    capabilities: [
      {
        id: '6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c',
        name: 'Risk assessment',
        description: 'Evaluate portfolio risk levels and exposure'
      },
      {
        id: '7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d',
        name: 'Diversification analysis',
        description: 'Analyze portfolio diversity across sectors and asset classes'
      },
      {
        id: '8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e',
        name: 'Performance tracking',
        description: 'Track and evaluate investment performance metrics'
      }
    ],
    usageCount: 245,
    lastUsed: new Date(),
    isFavorite: true,
    isPublic: true
  },
  {
    name: 'Market Research Assistant',
    description: 'Gathers and analyzes market data, news, and trends',
    category: 'Research',
    icon: 'Microscope',
    modelId: 'gpt-4',
    color: 'bg-gradient-to-r from-seafoam/80 to-seaglass',
    capabilities: [
      {
        id: '9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f',
        name: 'News analysis',
        description: 'Analyze market news and extract relevant insights'
      },
      {
        id: '0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a',
        name: 'Trend identification',
        description: 'Identify emerging market trends and patterns'
      },
      {
        id: '1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b',
        name: 'Competitor tracking',
        description: 'Track and analyze competitor activities and performance'
      }
    ],
    usageCount: 189,
    lastUsed: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isFavorite: false,
    isPublic: true
  },
  {
    name: 'ESG Evaluator',
    description: 'Evaluates investments based on Environmental, Social, and Governance criteria',
    category: 'ESG',
    icon: 'Leaf',
    modelId: 'gpt-4',
    color: 'bg-gradient-to-r from-fog to-heather',
    capabilities: [
      {
        id: '2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c',
        name: 'ESG scoring',
        description: 'Calculate and analyze ESG scores for investments'
      },
      {
        id: '3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d',
        name: 'Sustainability analysis',
        description: 'Evaluate sustainability practices and metrics'
      },
      {
        id: '4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e',
        name: 'Regulatory compliance',
        description: 'Ensure investments meet ESG-related regulations'
      }
    ],
    usageCount: 127,
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isFavorite: true,
    isPublic: true
  }
];

export default async ({ strapi }: { strapi: Strapi }) => {
  // Seed users
  for (const user of mockUsers) {
    try {
      const existingUser = await strapi.db.query('api::user.user').findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        await strapi.db.query('api::user.user').create({
          data: user,
        });
        console.log(`Created user: ${user.firstName} ${user.lastName}`);
      } else {
        console.log(`User ${user.email} already exists, skipping`);
      }
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }

  // Get admin user for relations
  const adminUser = await strapi.db.query('api::user.user').findOne({
    where: { email: 'admin@example.com' },
  });

  // Seed agents
  for (const agent of mockAgents) {
    try {
      const existingAgent = await strapi.db.query('api::agent.agent').findOne({
        where: { name: agent.name },
      });

      if (!existingAgent) {
        await strapi.db.query('api::agent.agent').create({
          data: {
            ...agent,
            // Add relation to admin user if found
            ...(adminUser ? { createdBy: adminUser.id } : {})
          },
        });
        console.log(`Created agent: ${agent.name}`);
      } else {
        console.log(`Agent ${agent.name} already exists, skipping`);
      }
    } catch (error) {
      console.error(`Error creating agent ${agent.name}:`, error);
    }
  }

  console.log('Seed script completed successfully');
}; 