import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import Web3 from 'web3'
// import { Helmet } from 'react-helmet'
// import { StaticRouter as Router } from 'react-router-dom'
import configureStore from '../../app/store'
import App from '../../app/containers/App'
import AuctionService from '../../app/services/auctionService'
import config from '../config/config'

export default (req, res) => {
  // Truffle expects web3 0.2 API so we need to set this. Pretty bullshit.
  Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

  const httpProvider = new Web3.providers.HttpProvider(config.infuraEndpoint)
  const auctionService = new AuctionService(httpProvider, config.contractAddress, config.defaultAddress)

  return auctionService.getAuctionInfo()
    .then((auction) => {
      const initialState = {
        auction,
        core: { auctionService }
      }
      const store = configureStore(initialState, null)
      // const location = req.url
      // const context = {}

      const Root = (
        <Provider store={store}>
          {/* <Router location={location} context={context}> */}
            <App />
          {/* </Router> */}
        </Provider>
      )
      const appHtml = renderToString(Root)
      // const head = Helmet.rewind()
      // Send HTML React app
      return res.render('index', {
        appHtml,
        initialState: JSON.stringify({}),
        title: 'EthBid | Buy some Ether using some Ether. Simple',
        contractAddress: config.contractAddress
      })
    })
    .catch(error => console.log('Error bootstrapping server render: ', error))
}
