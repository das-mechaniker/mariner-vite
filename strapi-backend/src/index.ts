// import type { Core } from '@strapi/strapi';
import seed from './seeds/seed';
import setPermissions from './seeds/set-permissions';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Run the seed script
    await seed({ strapi });
    
    // Set up permissions
    await setPermissions({ strapi });
  },
};
