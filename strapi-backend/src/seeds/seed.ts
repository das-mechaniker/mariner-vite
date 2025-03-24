export default async ({ strapi }) => {
  // Seed users
  const users = [
    {
      email: 'admin@mariner.ai',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
    },
    {
      email: 'john.doe@mariner.ai',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe&background=27AE60&color=fff'
    },
    {
      email: 'jane.smith@mariner.ai',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'user',
      avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith&background=E74C3C&color=fff'
    }
  ];

  // Seed agents
  const agents = [
    {
      name: 'Research Assistant',
      description: 'Helps with academic research and finding relevant information.',
      category: 'Research',
      icon: 'search',
      modelId: 'gpt-4',
      color: '#3498DB',
      capabilities: JSON.stringify({
        search: true,
        summarize: true,
        citation: true
      }),
      usageCount: 0,
      lastUsed: null,
      isFavorite: false,
      isPublic: true
    },
    {
      name: 'Code Helper',
      description: 'Assists with coding tasks and debugging issues.',
      category: 'Development',
      icon: 'code',
      modelId: 'gpt-4',
      color: '#27AE60',
      capabilities: JSON.stringify({
        codeCompletion: true,
        debugging: true,
        explanation: true
      }),
      usageCount: 0,
      lastUsed: null,
      isFavorite: false,
      isPublic: true
    },
    {
      name: 'Content Writer',
      description: 'Creates compelling content for various purposes.',
      category: 'Content',
      icon: 'file-text',
      modelId: 'gpt-4',
      color: '#E74C3C',
      capabilities: JSON.stringify({
        writing: true,
        editing: true,
        ideation: true
      }),
      usageCount: 0,
      lastUsed: null,
      isFavorite: false,
      isPublic: true
    }
  ];

  // Create users
  for (const userData of users) {
    try {
      // Check if user already exists
      const existingUser = await strapi.db.query('api::user.user').findOne({
        where: { email: userData.email }
      });

      if (!existingUser) {
        const user = await strapi.db.query('api::user.user').create({
          data: userData
        });
        console.log(`Created user: ${user.firstName} ${user.lastName}`);
      } else {
        console.log(`User with email ${userData.email} already exists. Skipping...`);
      }
    } catch (error) {
      console.error(`Error creating user ${userData.email}:`, error);
    }
  }

  // Create agents
  for (const agentData of agents) {
    try {
      // Check if agent already exists
      const existingAgent = await strapi.db.query('api::agent.agent').findOne({
        where: { name: agentData.name }
      });

      if (!existingAgent) {
        const agent = await strapi.db.query('api::agent.agent').create({
          data: agentData
        });
        console.log(`Created agent: ${agent.name}`);
      } else {
        console.log(`Agent ${agentData.name} already exists. Skipping...`);
      }
    } catch (error) {
      console.error(`Error creating agent ${agentData.name}:`, error);
    }
  }

  console.log('Seed data created successfully');
}; 