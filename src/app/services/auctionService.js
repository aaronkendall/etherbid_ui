import Units from 'ethereumjs-units'

import EthBid from '../utils/EthBidABI.json'
import { cleanAuctonData } from '../utils/auctionUtils'
import { CONTRACT_ADDRESS } from '../utils/constants'

export default class AuctionService {
  constructor(provider, defaultAddress= null) {
    this.accountAddress = defaultAddress
    this.initialiseContract(provider)
  }

  initialiseContract(provider) {
    const auctionContract = contract({ abi: EthBid.abi })
    auctionContract.setProvider(provider)
    auctionContract.defaults({ from: this.accountAddress })

    this.contract = auctionContract.at(CONTRACT_ADDRESS)
  }

  setDefaultAddress(address) {
    this.accountAddress = address
  }

  getAuctionInfo() {
    return this.contract.getAuctionInfo.call()
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
