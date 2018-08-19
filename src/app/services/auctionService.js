import Units from 'ethereumjs-units'
import contract from 'truffle-contract'
import Web3 from 'web3'

import EthBid from '../utils/EthBidABI.json'
import { cleanAuctionData } from '../utils/auctionUtils'

export default class AuctionService {
  constructor(contractAddress, infuraEndpoint, ethProvider = null) {
    this.initialiseContract(contractAddress, infuraEndpoint, ethProvider)
  }

  initialiseContract(contractAddress, infuraEndpoint, ethProvider) {
    Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send
    const httpProvider = new Web3.providers.HttpProvider(infuraEndpoint)

    const auctionContract = contract({ abi: EthBid })

    if (ethProvider) {
      auctionContract.setProvider(ethProvider)
    } else {
      auctionContract.setProvider(httpProvider)
    }

    this.contract = auctionContract.at(contractAddress)
  }

  getAuctionInfo() {
    return this.contract.getAuctionInfo.call()
      .then(auctionData => cleanAuctionData(auctionData))
      .catch(error => console.log('Error requesting auction info', error))
  }

  placeBid(bidder, bidValue, sender) {
    const bidInWei = Units.convert(bidValue, 'eth', 'wei')
    return this.contract.placeBid(bidder, { value: bidInWei, from: sender })
      .then(() => getAuctionInfo())
      .catch((error) => console.log('Error placing bid!', error))
  }
}
