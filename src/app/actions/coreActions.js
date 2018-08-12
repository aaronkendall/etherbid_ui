import EthBid from '../services/auctionService'
import { ACTION_TYPES } from '../utils/constants'
const { core } = ACTION_TYPES

export function toggleSignIn(userIsSignedIn) {
  return { type: core.SIGNING_ACTION, payload: userIsSignedIn }
}

export function setDefaultAccount(address) {
  return { type: core.SET_DEFAULT_ACCOUNT, payload: address }
}

export function setContractService(service) {
  return { type: core.SET_CONTRACT_SERVICE, payload: service }
}

export function initApp(defaultAccount, web3Provider) {
  return (dispatch) => {
    dispatch(setDefaultAccount(defaultAccount))
    dispatch(setContractService(new EthBid(web3Provider, defaultAccount)))
    dispatch(toggleSignIn(true))
  }
}
