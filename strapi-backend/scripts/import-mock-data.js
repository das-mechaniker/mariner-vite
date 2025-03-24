#!/usr/bin/env node

/**
 * Script to import mock data into Strapi
 * 
 * Usage: 
 * 1. Start Strapi in development mode
 * 2. Run this script: node scripts/import-mock-data.js
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const STRAPI_URL = 'http://localhost:1337';
const MOCK_DATA_PATH = path.resolve(__dirname, '../../mock-data.json');

// Admin credentials - you can override these with environment variables
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL || 'admin@admin.com';
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD || 'Admin123';

// Create axios instance
let strapi = axios.create({
  baseURL: STRAPI_URL
});

async function authenticate() {
  try {
    console.log('🔐 Authenticating with Strapi...');
    const response = await strapi.post('/admin/login', {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    });

    const { data } = response;
    if (!data || !data.data || !data.data.token) {
      console.error('Response data:', data);
      throw new Error('No token received from authentication');
    }
    
    // Update axios instance with auth token
    strapi = axios.create({
      baseURL: STRAPI_URL,
      headers: {
        Authorization: `Bearer ${data.data.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Authentication successful');
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

async function importData() {
  try {
    console.log('📦 Starting data import...');
    
    // Authenticate first
    await authenticate();
    
    // Check if Strapi is available
    try {
      await strapi.get('/');
      console.log('✅ Connected to Strapi server');
    } catch (error) {
      console.error('❌ Failed to connect to Strapi server. Is it running?');
      process.exit(1);
    }
    
    // Read mock data
    console.log(`📄 Reading mock data from ${MOCK_DATA_PATH}`);
    let mockData;
    try {
      mockData = JSON.parse(fs.readFileSync(MOCK_DATA_PATH, 'utf8'));
      console.log('✅ Mock data loaded successfully');
    } catch (error) {
      console.error('❌ Failed to read mock data:', error.message);
      process.exit(1);
    }
    
    // Import users
    console.log('👤 Importing users...');
    const users = await importUsers(mockData.users);
    
    // Import capabilities
    console.log('🔍 Importing capabilities...');
    const capabilities = await importCapabilities(mockData.capabilities);
    
    // Import documentation categories
    console.log('📚 Importing documentation categories...');
    const categories = await importDocumentationCategories(mockData.documentation_categories);
    
    // Import documentation articles
    console.log('📝 Importing documentation articles...');
    await importDocumentationArticles(mockData.documentation_articles || mockData.articles, users, categories);
    
    // Import research labs
    console.log('🧪 Importing research labs...');
    await importResearchLabs(mockData.research_labs, users);
    
    // Import agents
    console.log('🤖 Importing agents...');
    await importAgents(mockData.agents, users);
    
    // Create some example prompts (not in mock data)
    console.log('💬 Creating example prompts...');
    await createExamplePrompts(users);
    
    console.log('✅ Data import completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during import:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    } else {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}

async function importUsers(users) {
  const importedUsers = [];
  
  if (!users || !Array.isArray(users)) {
    console.log('  ℹ️ No users to import or invalid data format');
    return importedUsers;
  }
  
  for (const user of users) {
    try {
      console.log(`  🔄 Importing user: ${user.firstName} ${user.lastName} (${user.email})`);
      
      const response = await strapi.post('/admin/users', {
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        roles: [user.role === 'admin' ? 1 : 2],
        password: 'Password123!'
      });
      
      importedUsers.push(response.data);
      console.log(`  ✓ Created user: ${user.firstName} ${user.lastName}`);
    } catch (error) {
      // Skip if user exists
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ User ${user.email} already exists or validation failed`);
        console.log(`  🔍 Error details:`, error.response.data);
        
        // Try to find the existing user
        try {
          const existingUserResponse = await strapi.get(`/admin/users?_q=${user.email}`);
          if (existingUserResponse.data && existingUserResponse.data.length > 0) {
            importedUsers.push(existingUserResponse.data[0]);
            console.log(`  ✓ Found existing user: ${user.email}`);
          }
        } catch (findError) {
          console.log(`  ❌ Failed to find existing user: ${findError.message}`);
        }
      } else {
        console.error(`  ❌ Failed to create user ${user.email}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
  
  return importedUsers;
}

async function importCapabilities(capabilities) {
  const importedCapabilities = [];
  
  if (!capabilities || !Array.isArray(capabilities)) {
    console.log('  ℹ️ No capabilities to import or invalid data format');
    return importedCapabilities;
  }
  
  for (const capability of capabilities) {
    try {
      console.log(`  🔄 Importing capability: ${capability.name}`);
      
      const response = await strapi.post('/content-manager/collection-types/api::capability.capability', {
        name: capability.name,
        description: capability.description,
        icon: capability.icon
      });
      
      importedCapabilities.push(response.data);
      console.log(`  ✓ Created capability: ${capability.name}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Capability ${capability.name} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
      } else {
        console.error(`  ❌ Failed to create capability ${capability.name}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
  
  return importedCapabilities;
}

async function importDocumentationCategories(categories) {
  const importedCategories = [];
  
  if (!categories || !Array.isArray(categories)) {
    console.log('  ℹ️ No documentation categories to import or invalid data format');
    return importedCategories;
  }
  
  for (const category of categories) {
    try {
      console.log(`  🔄 Importing documentation category: ${category.name}`);
      
      const response = await strapi.post('/content-manager/collection-types/api::documentation-category.documentation-category', {
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        order: category.order,
        viewAllLink: category.viewAllLink,
        documents: category.documents || []
      });
      
      importedCategories.push(response.data);
      console.log(`  ✓ Created documentation category: ${category.name}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Category ${category.name} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
        
        // Try to find the existing category
        try {
          const existingResponse = await strapi.get(`/content-manager/collection-types/api::documentation-category.documentation-category?filters[slug][$eq]=${category.slug}`);
          if (existingResponse.data && existingResponse.data.length > 0) {
            importedCategories.push(existingResponse.data[0]);
            console.log(`  ✓ Found existing category: ${category.slug}`);
          }
        } catch (findError) {
          console.log(`  ❌ Failed to find existing category: ${findError.message}`);
        }
      } else {
        console.error(`  ❌ Failed to create category ${category.name}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
  
  return importedCategories;
}

async function importDocumentationArticles(articles, users, categories) {
  if (!articles || !Array.isArray(articles)) {
    console.log('  ℹ️ No documentation articles to import or invalid data format');
    return;
  }
  
  for (const article of articles) {
    try {
      console.log(`  🔄 Importing documentation article: ${article.title}`);
      
      // Find correct user and category
      let authorId = null;
      const author = users.find(u => 
        article.author && 
        u.firstname === article.author.firstName && 
        u.lastname === article.author.lastName
      );
      
      if (author) {
        authorId = author.id;
      }
      
      let categoryId = null;
      if (article.category) {
        const category = categories.find(c => 
          c.slug === article.category.slug
        );
        
        if (category) {
          categoryId = category.id;
        }
      }
      
      const response = await strapi.post('/content-manager/collection-types/api::documentation-article.documentation-article', {
        title: article.title,
        slug: article.slug,
        content: article.content,
        summary: article.summary,
        publishedAt: article.published ? new Date().toISOString() : null,
        category: categoryId,
        author: authorId
      });
      
      console.log(`  ✓ Created documentation article: ${article.title}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Article ${article.title} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
      } else {
        console.error(`  ❌ Failed to create article ${article.title}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
}

async function importResearchLabs(labs, users) {
  if (!labs || !Array.isArray(labs)) {
    console.log('  ℹ️ No research labs to import or invalid data format');
    return;
  }
  
  for (const lab of labs) {
    try {
      console.log(`  🔄 Importing research lab: ${lab.name}`);
      
      // Find correct user
      let createdById = null;
      if (lab.createdBy) {
        const creator = users.find(u => 
          u.firstname === lab.createdBy.firstName && 
          u.lastname === lab.createdBy.lastName
        );
        
        if (creator) {
          createdById = creator.id;
        }
      }
      
      const response = await strapi.post('/content-manager/collection-types/api::research-lab.research-lab', {
        name: lab.name,
        description: lab.description,
        icon: lab.icon,
        tools: lab.tools || [],
        isPublic: lab.isPublic,
        createdBy: createdById
      });
      
      console.log(`  ✓ Created research lab: ${lab.name}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Research lab ${lab.name} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
      } else {
        console.error(`  ❌ Failed to create research lab ${lab.name}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
}

async function importAgents(agents, users) {
  if (!agents || !Array.isArray(agents)) {
    console.log('  ℹ️ No agents to import or invalid data format');
    return;
  }
  
  for (const agent of agents) {
    try {
      console.log(`  🔄 Importing agent: ${agent.name}`);
      
      // Find creator user
      let createdById = null;
      if (agent.createdBy) {
        const creator = users.find(u => 
          u.firstname === agent.createdBy.firstName && 
          u.lastname === agent.createdBy.lastName
        );
        
        if (creator) {
          createdById = creator.id;
        }
      }
      
      // Format lastUsed as ISO date
      let lastUsed = null;
      if (agent.lastUsed) {
        if (agent.lastUsed.includes('hour')) {
          // e.g. "2 hours ago" -> now - 2 hours
          const hours = parseInt(agent.lastUsed.split(' ')[0]);
          const date = new Date();
          date.setHours(date.getHours() - hours);
          lastUsed = date.toISOString();
        } else if (agent.lastUsed.includes('day')) {
          // e.g. "2 days ago" -> now - 2 days
          const days = parseInt(agent.lastUsed.split(' ')[0]);
          const date = new Date();
          date.setDate(date.getDate() - days);
          lastUsed = date.toISOString();
        }
      }
      
      const response = await strapi.post('/content-manager/collection-types/api::agent.agent', {
        name: agent.name,
        description: agent.description,
        category: agent.category,
        icon: agent.icon,
        modelId: agent.modelId,
        color: agent.color,
        capabilities: agent.capabilities,
        usageCount: agent.usageCount,
        lastUsed: lastUsed,
        isFavorite: agent.isFavorite,
        isPublic: agent.isPublic,
        createdBy: createdById
      });
      
      console.log(`  ✓ Created agent: ${agent.name}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Agent ${agent.name} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
      } else {
        console.error(`  ❌ Failed to create agent ${agent.name}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
}

async function createExamplePrompts(users) {
  // Create some example prompts since they're not in the mock data
  const examplePrompts = [
    {
      title: "Market Analysis Report",
      promptText: "Generate a comprehensive market analysis report for [INDUSTRY] focusing on current trends, market size, key players, growth opportunities, and potential challenges over the next 5 years.",
      category: "Research",
      tags: ["market-analysis", "industry-research", "trends"]
    },
    {
      title: "Risk Assessment",
      promptText: "Evaluate the risk profile of [COMPANY/ASSET] considering market volatility, liquidity, regulatory environment, and sector-specific challenges. Provide a risk score from 1-10 and detailed justification.",
      category: "Risk Management",
      tags: ["risk-assessment", "investment", "analysis"]
    },
    {
      title: "ESG Rating Summary",
      promptText: "Create an ESG rating summary for [COMPANY] analyzing their environmental initiatives, social responsibility programs, and governance structure. Highlight strengths, areas for improvement, and compare to industry benchmarks.",
      category: "ESG",
      tags: ["esg", "sustainability", "governance"]
    }
  ];
  
  // Find a user to associate the prompts with
  const authorUser = users.find(u => u.roles && u.roles.some(r => r.id === 1));
  let authorId = null;
  if (authorUser) {
    authorId = authorUser.id;
  }
  
  for (const prompt of examplePrompts) {
    try {
      console.log(`  🔄 Importing prompt: ${prompt.title}`);
      
      const response = await strapi.post('/content-manager/collection-types/api::prompt.prompt', {
        title: prompt.title,
        promptText: prompt.promptText,
        category: prompt.category,
        tags: prompt.tags,
        publishedAt: new Date().toISOString(),
        author: authorId
      });
      
      console.log(`  ✓ Created prompt: ${prompt.title}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(`  ⚠️ Prompt ${prompt.title} already exists or has validation errors`);
        console.log(`  🔍 Error details:`, error.response.data);
      } else {
        console.error(`  ❌ Failed to create prompt ${prompt.title}:`, error.message);
        if (error.response) {
          console.error(`  Error response:`, error.response.data);
        }
      }
    }
  }
}

// Run the import
importData(); 