import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import reduxConnectProps from '../utils/redux-connect-props'
import Countdown from 'react-countdown-now'
import { ToastContainer, toast } from 'react-toastify'

import initialiseWeb3 from '../utils/initWeb3'
import { updateAuctionInfo, placeBid } from '../actions/auctionActions'
import { isBrowser } from '../utils/constants'

import SubmitBid from '../components/SubmitBid'

@connect(store => ({
  auction: store.auction,
  userIsSignedIn: store.core.userIsSignedIn
}))
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      auctionForm: {
        bidder: '',
        bid: ''
      },
      bidInProgress: false
    }
  }

  componentDidMount() {
    const { dispatch, userIsSignedIn } = this.props

    initialiseWeb3(dispatch)

    window.setInterval(() => {
      dispatch(updateAuctionInfo())
      if (!userIsSignedIn) initialiseWeb3(dispatch)
    }, 10000)
  }

  componentWillReceiveProps(nextProps) {
    const { auction: { highestBidder, highestBid } } = nextProps

    if (this.props.highestBidder && this.props.highestBidder !== highestBidder) {
      toast.info(`New highest bidder! ${highestBidder} with ${highestBid} ETH`)
    }
  }

  handleFormChange(event) {
    const { auctionForm } = this.state

    this.setState({ auctionForm, ...{ [event.target.id]: event.target.value } })
  }

  handleBidSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props
    const { auctionForm: { bidder, bid } } = this.state
    if (!bidder || !bid) return // do some form validation thing here

    this.setState({ bidInProgress: true })
    dispatch(placeBid(bidder, bid))
      .then((highestBidder) => {
        toast.success(`Bid placed! ${highestBidder} is the highest bidder!`)
        this.setState({ bidInProgress: false })
      })
      .catch((error) => {
        toast.error('Error placing bid! Perhaps it\'s a gas issue?')
        this.setState({ bidInProgress: false })
      })
  }

  _renderAuction() {
    const { auction: { highestBidder, highestBid, endTime, prize } } = this.props

    return (
      <section className="auction">
        <h2 className="auction__prize">Prize Pool : {prize}</h2>
        <Countdown className="auction__timer" date={new Date(endTime)} />
        {highestBidder && <h2 className="auction__highest-bidder">
          {highestBidder} is the highest bidder with {highestBid} ETH!
        </h2>}
        {!highestBidder && <h2 className="auction__highest-bidder">
          There are no bids yet! Be the first!
        </h2>}
      </section>
    )
  }

  _renderWeb3Instructons() {
    return <p>Install MetaMask you donk</p>
  }

  render() {
    const { userIsSignedIn } = this.props
    const { bidInProgress, isLoading } = this.state

    return (
      <main className="main-container">
        <ToastContainer />
        <h1 className="logo">EthBid</h1>
        {this._renderAuction()}
        {!userIsSignedIn && this._renderWeb3Instructons()}
        {userIsSignedIn &&
          <SubmitBid handleChange={() => this.handleFormChange} handleSubmit={() => this.handleBidSubmit} />
        }
      </main>
    )
  }
}

// export default withRouter(reduxConnectProps(App))
export default reduxConnectProps(App)
