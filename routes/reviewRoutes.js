const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
  getReview,
} = require('../controllers/reviewController')

const router = express.Router({ mergeParams: true }) // -> To get access the ther previous router params.

router.use(protect)

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserIds, createReview)

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview)

module.exports = router
