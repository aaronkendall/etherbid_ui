import React from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'

class SubmitBid extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isError: false
    }
  }

  _renderForm() {
    const { handleChange, handleSubmit } = this.props

    return (
      <form className="submit-bid" onSubmit={handleSubmit}>
        <label htmlFor="bidder" className="submit-bid__label">Name</label>
        <input id="bidder" type="text" className="submit-bid__input" onChange={handleChange} required />
        <label htmlFor="bid" className="submit-bid__label">Bid value in ETH</label>
        <input id="bid" type="tel" className="submit-bid__input" onChange={handleChange} required />
        <button className="submit-bid__button" type="submit" onClick={handleSubmit}>
          Place Bid!
        </button>
      </form>
    )
  }

  _renderLoading() {
    return (
      <div className="submit-bid">
        <h2 className="submit-bid__in-progress">Placing bid...</h2>
        <Loading />
      </div>
    )
  }

  render() {
    const { bidInProgress } = this.props

    return (
      <React.Fragment>
        {bidInProgress && this._renderLoading()}
        {!bidInProgress && this._renderForm()}
      </React.Fragment>
    )
  }
}

SubmitBid.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  bidInProgress: PropTypes.bool.isRequired
}

export default SubmitBid
