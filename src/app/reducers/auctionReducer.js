import { ACTION_TYPES } from '../utils/constants'
const { auction } = ACTION_TYPES

const defaultState = {
  highestBid: 0,
  highestBidder: '',
  endTime: '',
  prize: 0
}

export default function auctionReducer(state = defaultState, action) {
	const newState = { ...defaultState, ...state }

  switch(action.type) {
    case auction.UPDATE_AUCTION_INFO:
      return { ...newState, ...action.payload }
    default:
      return newState
  }
}
