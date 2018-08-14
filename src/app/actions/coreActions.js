import AuctionService from '../services/auctionService'
import { ACTION_TYPES, CONTRACT_ADDRESS } from '../utils/constants'
const { core } = ACTION_TYPES

export function toggleSignIn(userIsSignedIn) {
  return { type: core.AUTH_ACTION, payload: userIsSignedIn }
}

export function setDefaultAccount(address) {
  return { type: core.SET_DEFAULT_ACCOUNT, payload: address }
}

export function setContractService(service) {
  return { type: core.SET_CONTRACT_SERVICE, payload: service }
}

export function initApp(web3Provider, defaultAccount) {
  return (dispatch) => {
    dispatch(setDefaultAccount(defaultAccount))
    dispatch(setContractService(new AuctionService(web3Provider, CONTRACT_ADDRESS, defaultAccount)))
    dispatch(toggleSignIn(true))
  }
}
