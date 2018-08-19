import React from 'react'
import PropTypes from 'prop-types'

import Loading from './Loading'

const SubmitBid = ({ handleChange, handleSubmit, error, bidInProgress, formValues }) => {
  const _renderForm = () => {
    return (
      <form className="submit-bid" onSubmit={handleSubmit}>
        {error && <span className="submit-bid__error">{error}</span>}
        <label className="submit-bid__label">
          Name
          <input id="bidder" type="text" className="submit-bid__input" onChange={handleChange} value={formValues.bidder} required />
        </label>
        <label className="submit-bid__label">
          Bid value in ETH
          <input id="bid" type="tel" className="submit-bid__input" onChange={handleChange} value={formValues.bid} required />
        </label>
        <button className="submit-bid__button" type="submit">
          Place Bid
        </button>
      </form>
    )
  }

  const _renderLoading = () => {
    return (
      <div className="submit-bid">
        <h2 className="submit-bid__in-progress">Placing your bid...</h2>
        <Loading />
      </div>
    )
  }

  return (
    <React.Fragment>
      {bidInProgress && _renderLoading()}
      {!bidInProgress && _renderForm()}
    </React.Fragment>
  )
}

SubmitBid.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  bidInProgress: PropTypes.bool.isRequired,
  error: PropTypes.string,
  formValues: PropTypes.shape({
    bid: PropTypes.string,
    bidder: PropTypes.string
  })
}

export default SubmitBid
