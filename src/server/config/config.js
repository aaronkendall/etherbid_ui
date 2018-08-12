const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    contractAddress: '0xrinkeby'
  },
  production: {
    infuraEndpoint: '0xmainnet'
  }
};

const defaultConfig = {};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
