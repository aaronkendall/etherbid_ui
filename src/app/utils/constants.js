export const isBrowser = typeof window !== 'undefined'

export const ACTION_TYPES = {
  auction: {
    UPDATE_AUCTION_INFO: 'auction/UPDATE_AUCTION_INFO'
  },
  core: {
    AUTH_ACTION: 'core/AUTH_ACTION',
    SET_DEFAULT_ACCOUNT: 'core/SET_DEFAULT_ACCOUNT',
    SET_CONTRACT_SERVICE: 'core/SET_CONTRACT_SERVICE'
  }
}

export const CONTRACT_ADDRESS = isBrowser && window._config.contractAddress
