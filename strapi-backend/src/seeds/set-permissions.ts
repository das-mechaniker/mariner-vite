// import { Strapi } from '@strapi/strapi';

/**
 * Set permissions for public access to our content types
 */
export default async ({ strapi }) => {
  // Find the public role
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    console.error('Public role not found');
    return;
  }

  // Set of permissions to add
  const permissions = [
    // Public role permissions for user
    {
      action: 'api::user.user.find',
      role: publicRole.id,
    },
    {
      action: 'api::user.user.findOne',
      role: publicRole.id,
    },
    // Public role permissions for agent
    {
      action: 'api::agent.agent.find',
      role: publicRole.id,
    },
    {
      action: 'api::agent.agent.findOne',
      role: publicRole.id,
    },
  ];

  // Create permissions
  for (const permission of permissions) {
    try {
      const existing = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: permission.action,
            role: permission.role,
          },
        });

      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: {
            action: permission.action,
            role: permission.role,
            enabled: true,
          },
        });
        console.log(`Created permission: ${permission.action}`);
      } else if (!existing.enabled) {
        // Update permission if it exists but is not enabled
        await strapi.query('plugin::users-permissions.permission').update({
          where: { id: existing.id },
          data: { enabled: true },
        });
        console.log(`Updated permission: ${permission.action}`);
      } else {
        console.log(`Permission ${permission.action} already exists and is enabled`);
      }
    } catch (error) {
      console.error(`Error setting permission ${permission.action}:`, error);
    }
  }

  console.log('Permissions set successfully');
}; 