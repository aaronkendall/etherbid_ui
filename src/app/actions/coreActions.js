import AuctionService from '../services/auctionService'
import { ACTION_TYPES, INFURA_ENDPOINT, CONTRACT_ADDRESS } from '../utils/constants'
const { core } = ACTION_TYPES

export function toggleSignIn(userIsSignedIn) {
  return { type: core.AUTH_ACTION, payload: userIsSignedIn }
}

function setContractService(service) {
  return { type: core.SET_CONTRACT_SERVICE, payload: service }
}

function setDefaultAddress(address) {
  return { type: core.SET_DEFAULT_ACCOUNT, payload: address }
}

export function initApp() {
  return (dispatch, getState) => {
    const { core: { userIsSignedIn, auctionService } } = getState()

    if (typeof window.web3 !== 'undefined') {
      window.web3.eth.getAccounts((err, accounts) => {
        if (accounts.length > 0) {
          if (!userIsSignedIn) {
            const ethProvider = window.web3.currentProvider
            const auctionService = new AuctionService(CONTRACT_ADDRESS, INFURA_ENDPOINT, ethProvider)
            
            dispatch(setContractService(auctionService))
            dispatch(toggleSignIn(true))
          }

          dispatch(setDefaultAddress(accounts[0]))
        }
      })
    }

    if (Object.keys(auctionService).length === 0) {
      const auctionService = new AuctionService(CONTRACT_ADDRESS, INFURA_ENDPOINT)
      dispatch(setContractService(auctionService))
    }
  }
}
