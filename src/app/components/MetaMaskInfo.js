import React from 'react'

const MetaMaskInfo = () => (
  <section className="metamask">
    <p className="metamask__info">You must install MetaMask or a similar browser wallet to be able to bid. If you have it installed already login to your wallet.</p>
    <a className="metamask__link" target="_blank" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">MetaMask for Chrome</a>
    <a className="metamask__link" target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">MetaMask for Firefox</a>
  </section>
)

export default MetaMaskInfo
