import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
// import { Helmet } from 'react-helmet'
// import { StaticRouter as Router } from 'react-router-dom'
import asyncBootstrapper from 'react-async-bootstrapper'
import configureStore from '../../app/store'
import App from '../../app/containers/App'
import config from '../config/config'

export default (req, res) => {
  const store = configureStore({}, null)
  // const location = req.url
  // const context = {}

  const Root = (
    <Provider store={store}>
      {/* <Router location={location} context={context}> */}
        <App />
      {/* </Router> */}
    </Provider>
  )

  return asyncBootstrapper(Root).then(() => {
    const currentState = store.getState()
    const appHtml = renderToString(Root)
    // const head = Helmet.rewind()
    const initialState = JSON.stringify(currentState)

    // Send HTML React app
    return res.render('index', {
      appHtml,
      initialState,
      title: 'EthBid | Buy some Ether using some Ether. Simple',
      contractAddress: config.contractAddress
    })
  })
  .catch(error => console.log('Error bootstrapping server render: ', error));
}
