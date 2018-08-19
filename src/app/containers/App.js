import React from 'react'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'
import reduxConnectProps from '../utils/redux-connect-props'
import { ToastContainer, toast } from 'react-toastify'

import { initApp } from '../actions/coreActions'
import { updateAuctionInfo, placeBid } from '../actions/auctionActions'
import { isBrowser } from '../utils/constants'
import { isNaN } from '../utils/floatUtils'

import SubmitBid from '../components/SubmitBid'
import MetaMaskInfo from '../components/MetaMaskInfo'
import AuctionInfo from '../components/AuctionInfo'
import Modal from '../components/Modal'

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
      formError: '',
      bidInProgress: false,
      modalIsOpen: false
    }
  }

  updateAppInfo() {
    const { dispatch } = this.props

    dispatch(initApp())
    dispatch(updateAuctionInfo())
  }

  componentWillMount() {
    const { dispatch } = this.props

    if (isBrowser) {
      dispatch(initApp())
      setInterval(() => this.updateAppInfo(), 5000)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auction: { highestBidder, highestBid }, userIsSignedIn } = nextProps

    if (this.props.highestBidder && this.props.highestBidder !== highestBidder) {
      toast.info(`New highest bidder! ${highestBidder} with ${highestBid} ETH`)
    }
  }

  handleFormChange(event) {
    const { auctionForm } = this.state
    const { target: { id, value } } = event

    this.setState({ auctionForm: { ...auctionForm, ...{ [id]: value } } })
  }

  handleBidSubmit(event) {
    event.preventDefault()
    const { dispatch } = this.props
    const { auctionForm: { bidder, bid } } = this.state
    if (!bidder || !bid) return this.setState({ formError: 'Please provide a name and bid amount' })
    if (isNaN(parseFloat(bid))) return this.setState({ formError: 'ETH values must be a whole number or decimal' })

    this.setState({ bidInProgress: true })
    this.setState({ formError: '' })
    dispatch(placeBid(bidder, parseFloat(bid).toString()))
      .then(() => {
        toast.success(`Bid placed`)
        this.setState({ bidInProgress: false })
      })
      .catch((error) => {
        toast.error('Error placing bid! Perhaps it\'s a gas issue?')
        this.setState({ bidInProgress: false })
      })
  }

  render() {
    const { userIsSignedIn, auction } = this.props
    const { bidInProgress, isLoading, modalIsOpen, formError, auctionForm } = this.state

    return (
      <main className="main-container">
        <ToastContainer />
        <Modal isOpen={modalIsOpen} handleClose={() => this.setState({ modalIsOpen: false})} />
        <h1 className="logo" onClick={()=> this.setState({ modalIsOpen: true })}>EthBid</h1>
        <AuctionInfo auction={auction} />
        {!userIsSignedIn && <MetaMaskInfo />}
        {userIsSignedIn &&
          <SubmitBid
            handleChange={(event) => this.handleFormChange(event)}
            handleSubmit={(event) => this.handleBidSubmit(event)}
            bidInProgress={bidInProgress}
            error={formError}
            formValues={auctionForm}
          />
        }
      </main>
    )
  }
}

// export default withRouter(reduxConnectProps(App))
export default reduxConnectProps(App)
