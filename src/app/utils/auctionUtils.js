import Units from 'ethereumjs-units'

export function cleanAuctonData(rawAuction) {
  return {
    highestBid: Units.convert(rawAuction[0], 'wei', 'eth'),
    highestBidder: rawAuction[1],
    endTime: rawAuction[2],
    prize: rawAuction[3]
  }
}
