const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Booking = require('../models/bookingModel')

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get data from the collection
  const tours = await Tour.find()

  // 2)

  // 3)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  })
})

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  })

  if (!tour) {
    return next(new AppError('There is no tour with that name.', 404))
  }

  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  })
})

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into you account',
  })
}

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Create your account!',
  })
}

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  })
}

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id })
  const toursIds = bookings.map((el) => el.tour)
  const tours = await Tour.find({ _id: { $in: toursIds } })
  // console.log(tours)
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  })
})
