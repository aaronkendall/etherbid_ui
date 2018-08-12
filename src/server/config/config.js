const environment = process.env.NODE_ENV || 'development';
const envConfig = {
  development: {
    infuraEndpoint: 'https://rinkeby.infura.io/SnIpGs4RANMJbNEiFu2Q'
  },
  production: {
    contractAddress: '0xmainnet',
    infuraEndpoint: 'https://mainnet.infura.io/SnIpGs4RANMJbNEiFu2Q'
  }
}

const defaultConfig = {
  contractAddress: process.env.CONTRACT_ADDRESS
}

const config = Object.assign({}, defaultConfig, envConfig[environment])

module.exports = config
