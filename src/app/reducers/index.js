import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import auctionReducer from './auctionReducer'
import coreReducer from './coreReducer'

export default combineReducers({
  auction: auctionReducer,
  core: coreReducer
})
