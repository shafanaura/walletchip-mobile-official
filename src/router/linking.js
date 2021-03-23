const config = {
  screens: {
    CreatePin: {
      path: 'activate/:token',
      parse: {
        token: token => `${token}`,
      },
    },
  },
};

const linking = {
  prefixes: ['walletchip://'],
  config,
};

export default linking;
