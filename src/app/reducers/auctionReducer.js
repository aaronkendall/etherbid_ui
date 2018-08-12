import { auctionActions } from '../actions'

const defaultState = {
  highestBid: 0,
  highestBidder: '',
  endTime: '',
  prize: 0
}

export default function auctionReducer(state = defaultState, action) {
	const newState = { ...defaultState, ...state }

  switch(action.type) {
    case auctionActions.UPDATE_AUCTION_INFO:
      return { ...newState, ...action.payload.auction }
    default:
      return newState
  }
}
