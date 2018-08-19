import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import reduxConnectProps from '../utils/redux-connect-props'
import { ToastContainer, toast } from 'react-toastify'

import initialiseWeb3 from '../utils/initWeb3'
import { updateAuctionInfo, placeBid } from '../actions/auctionActions'
import { isBrowser } from '../utils/constants'

import SubmitBid from '../components/SubmitBid'
import MetaMaskInfo from '../components/MetaMaskInfo'
import AuctionInfo from '../components/AuctionInfo'
import Modal from '../components/Modal'

@connect(store => ({
  auction: store.auction,
  userIsSignedIn: store.core.userIsSignedIn,
  auctionService: store.core.auctionService
}))
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      auctionForm: {
        bidder: '',
        bid: ''
      },
      bidInProgress: false,
      modalIsOpen: false
    }

    this.checkForMetaMask = this.checkForMetaMask.bind(this)
    this.intervalId = null
  }

  checkForMetaMask() {
    const { dispatch, auctionService } = this.props
    const hasNoAuctionService = Object.keys(auctionService).length === 0

    initialiseWeb3(dispatch, hasNoAuctionService)
    dispatch(updateAuctionInfo())
  }

  componentDidMount() {
    const { dispatch, userIsSignedIn } = this.props

    initialiseWeb3(dispatch)

    // if (!userIsSignedIn) {
    //   this.intervalId  = setInterval(this.checkForMetaMask, 10000)
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { auction: { highestBidder, highestBid }, userIsSignedIn } = nextProps

    if (this.props.highestBidder && this.props.highestBidder !== highestBidder) {
      toast.info(`New highest bidder! ${highestBidder} with ${highestBid} ETH`)
    }

    // do we need this?
    if (!this.props.userIsSignedIn && userIsSignedIn) {
      clearInterval(this.intervalId)
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

  render() {
    const { userIsSignedIn, auction } = this.props
    const { bidInProgress, isLoading, modalIsOpen } = this.state

    return (
      <main className="main-container">
        <ToastContainer />
        <Modal isOpen={modalIsOpen} handleClose={() => this.setState({ modalIsOpen: false})} />
        <h1 className="logo" onClick={()=> this.setState({ modalIsOpen: true })}>EthBid</h1>
        <AuctionInfo auction={auction} />
        {!userIsSignedIn && <MetaMaskInfo />}
        {userIsSignedIn &&
          <SubmitBid handleChange={() => this.handleFormChange} handleSubmit={() => this.handleBidSubmit} bidInProgress={bidInProgress} />
        }
      </main>
    )
  }
}

// export default withRouter(reduxConnectProps(App))
export default reduxConnectProps(App)
