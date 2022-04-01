const express = require('express')
const router = express.Router()
const {
  addURL,
  getList,
  redirectURL,
  updateLinkClicks,
  updateParamsVisits,
  deleteURL,
} = require('../controllers/urlController')

router.post('/', addURL)
router.get('/shortenurls', getList)
router.get('/shortenurls/:shorten', redirectURL)
router.put('/shortenurls', updateLinkClicks)
router.put('/shortenurls/:shorten', updateParamsVisits)
router.delete('/shortenurls/:shorten', deleteURL)

module.exports = router
