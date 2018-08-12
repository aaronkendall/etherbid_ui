const express = require('express')
const router = express.Router()

const config = require('../config/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'EthBid | Buy some Ether using some Ether. Simple',
    contractAddress: config.contractAddress
  })
})

module.exports = router
