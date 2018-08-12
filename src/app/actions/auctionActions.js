import { ACTION_TYPES, INFURA_ENDPOINT } from '../utils/constants'
const { auction } = ACTION_TYPES

export function updateAuctionInfo() {
  return (dispatch, getState) => {
    const { core: { auctionService } } = getState()

    return auctionService.getAuctionInfo()
  }
}
