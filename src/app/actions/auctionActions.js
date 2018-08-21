import { ACTION_TYPES, INFURA_ENDPOINT } from '../utils/constants'
const { auction } = ACTION_TYPES

function setAuctionInfo(auctionInfo) {
  return { type: auction.UPDATE_AUCTION_INFO, payload: auctionInfo }
}

export function updateAuctionInfo() {
  return (dispatch, getState) => {
    const { core: { auctionService } } = getState()

    return auctionService.getAuctionInfo()
      .then((auctionInfo) => dispatch(setAuctionInfo(auctionInfo)))
  }
}

export function placeBid(bidder, bid) {
  return (dispatch, getState) => {
    const { core: { auctionService, defaultAccount } } = getState()

    return auctionService.placeBid(bidder, bid, defaultAccount)
      .then((auctionInfo) => dispatch(setAuctionInfo(auctionInfo)))
  }
}
