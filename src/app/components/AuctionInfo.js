import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown-now'

const AuctionInfo = ({ auction }) => {
  const { highestBidder, highestBid, endTime, prize } = auction

  return (
    <section className="auction-info">
      <h2 className="auction-info__highlight --full-width --timer">
        <span className="auction-info__highlight--title">Time remaining</span>
        <Countdown className="auction-info__timer" date={endTime} />
      </h2>
      <h2 className="auction-info__highlight">
        <span className="auction-info__highlight--title">Prize Pool</span>
        {prize} ETH
      </h2>
      {highestBidder &&
      <React.Fragment>
        <h2 className="auction-info__highlight">
          <span className="auction-info__highlight--title">highest bidder</span>
          {highestBidder}
        </h2>
        <h2 className="auction-info__highlight">
          <span className="auction-info__highlight--title">highest bid</span>
          {highestBid} ETH!
        </h2>
      </React.Fragment>}
      {!highestBidder && <h2 className="auction-info__highlight --full-width">
        There are no bids yet! Be the first!
      </h2>}
    </section>
  )
}

AuctionInfo.propTypes = {
  auction: PropTypes.shape({
    highestBidder: PropTypes.string,
    highestBid: PropTypes.string,
    endTime: PropTypes.number,
    prize: PropTypes.string
  }).isRequired
}

export default AuctionInfo
