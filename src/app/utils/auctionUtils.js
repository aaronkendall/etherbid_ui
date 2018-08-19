import Units from 'ethereumjs-units'

export function cleanAuctionData(rawAuction) {
  return {
    highestBid: Units.convert(rawAuction[0].toString(), 'wei', 'eth'),
    highestBidder: rawAuction[1],
    endTime: rawAuction[2].toString() * 1000, // argument for dates must be in milliseconds
    prize: Units.convert(rawAuction[3].toString(), 'wei', 'eth')
  }
}
