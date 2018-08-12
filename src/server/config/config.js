const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    contractAddress: '0xrinkeby',
    infuraEndpoint: 'https://rinkeby.infura.io/SnIpGs4RANMJbNEiFu2Q'
  },
  production: {
    infuraEndpoint: '0xmainnet',
    infuraEndpoint: 'https://mainnet.infura.io/SnIpGs4RANMJbNEiFu2Q'
  }
};

const defaultConfig = {};

const config = Object.assign({}, defaultConfig, envConfig[environment]);

module.exports = config;
