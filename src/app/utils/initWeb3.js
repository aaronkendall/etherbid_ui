import Web3 from 'web3'

import AuctionService from '../services/auctionService'
import { initApp, setContractService } from '../actions/coreActions'
import { INFURA_ENDPOINT, CONTRACT_ADDRESS } from '../utils/constants'

export default function initialiseWeb3(dispatch, hasNoAuctionService) {
  if (typeof window.web3 !== 'undefined') {
    const ethProvider = window.web3.currentProvider

    return window.web3.eth.getAccounts((err, accounts) => {
      if (accounts.length > 0) {
        // This needs to be added to state here as it doesn't persist otherwise and
        // we get some weird errors occasionally with the address being undefined
        dispatch(initApp(ethProvider, accounts[0]))
      }
    })
  }

  if (hasNoAuctionService) {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

    const httpProvider = new Web3.providers.HttpProvider(INFURA_ENDPOINT)
    const auctionService = new AuctionService(httpProvider, CONTRACT_ADDRESS)
    dispatch(setContractService(auctionService))
  }
}
