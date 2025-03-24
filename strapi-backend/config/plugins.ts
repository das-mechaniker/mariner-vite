export default {
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      rest: {
        defaultLimit: 100,
        maxLimit: 250,
      },
    },
  },
};
