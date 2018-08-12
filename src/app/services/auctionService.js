import Units from 'ethereumjs-units'
import contract from 'truffle-contract'

import EthBid from '../utils/EthBidABI.json'
import { cleanAuctionData } from '../utils/auctionUtils'

export default class AuctionService {
  constructor(provider, contractAddress, defaultAddress = null) {
    this.initialiseContract(provider, contractAddress, defaultAddress)
  }

  initialiseContract(provider, contractAddress, accountAddress) {
    const auctionContract = contract({ abi: EthBid })
    auctionContract.setProvider(provider)

    if (accountAddress) auctionContract.defaults({ from: accountAddress })

    this.contract = auctionContract.at(contractAddress)
  }

  getAuctionInfo() {
    return this.contract.getAuctionInfo()
      .then(auctionData => cleanAuctionData(auctionData))
      .catch(error => console.log('Error requesting auction info', error))
  }

  placeBid(bidder, bidValue) {
    const bidInWei = Units.convert(bidValue, 'eth', 'wei')
    return this.contract.placeBid.send(bidder, bidInWei)
      .then(() => getAuctionInfo())
      .catch(() => console.log('Error placing bid!', error))
  }
}
