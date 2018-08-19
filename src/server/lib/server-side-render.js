import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
// import { Helmet } from 'react-helmet'
// import { StaticRouter as Router } from 'react-router-dom'
import configureStore from '../../app/store'
import App from '../../app/containers/App'
import AuctionService from '../../app/services/auctionService'
import { contractAddress, infuraEndpoint } from '../config/config'

export default (req, res) => {
  const auctionService = new AuctionService(contractAddress, infuraEndpoint)

  return auctionService.getAuctionInfo()
    .then((auction) => {
      const initialState = {
        auction
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
        initialState: JSON.stringify(store.getState()),
        title: 'EthBid | Buy some Ether using some Ether. Simple',
        contractAddress,
        infuraEndpoint
      })
    })
    .catch(error => console.log('Error bootstrapping server render: ', error))
}
