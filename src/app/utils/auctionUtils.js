import Units from 'ethereumjs-units'

export function cleanAuctonData(rawAuction) {
  return {
    highestBid: Units.convert(rawAuction[0].toString(), 'wei', 'eth'),
    highestBidder: rawAuction[1],
    endTime: rawAuction[2].toString(),
    prize: rawAuction[3].toString()
  }
}
