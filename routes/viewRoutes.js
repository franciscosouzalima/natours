const express = require('express')
const { isLoggedIn, protect } = require('../controllers/authController')
const {
  getCheckoutSession,
  createBookingCheckout,
} = require('../controllers/bookingController')
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  getSignupForm,
} = require('../controllers/viewsController')

const router = express.Router()

// router.use(isLoggedIn)

router.get('/', createBookingCheckout, isLoggedIn, getOverview)
router.get('/tour/:slug', isLoggedIn, getTour)
router.get('/login', isLoggedIn, getLoginForm)
router.get('/signup', getSignupForm)
router.get('/me', protect, getAccount)
router.get('/my-tours', protect, getMyTours)

module.exports = router
