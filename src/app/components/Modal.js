import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import { CONTRACT_ADDRESS } from '../utils/constants'

ReactModal.setAppElement('#app')

const Modal = ({ handleClose, isOpen }) => (
  <ReactModal className="modal" overlayClassName="modal-overlay" isOpen={isOpen} onRequestClose={handleClose}>
    <i className="modal__close" onClick={handleClose} />
    <h2 className="modal__title">What is ETHBID?</h2>
    <p className="modal__content">
      ETHBID is an auction, plain and simple. An amount of ETH is put up for auction and whomever is
       the highest bidder when the timer gets to zero receives the ETH. Oh, but you don't get your ETH
       back if you don't win...
   </p>
   <p className="modal__content">You can check out the smart contract for it <a className="modal__content--link" href={`https://etherscan.io/address/${CONTRACT_ADDRESS}`}>here</a>.</p>
  </ReactModal>
)

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default Modal
