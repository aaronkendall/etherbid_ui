const express = require('express')
const router = express.Router()

const render = require('../lib/server-side-render').default

/* GET home page. */
router.get('/', function(req, res, next) {
  return render(req, res)
})

module.exports = router
