const path = require('path')
const pug = require('pug')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const viewRouter = require('./routes/viewRoutes')
const bookingRouter = require('./routes/bookingRoutes')

const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// 1) MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public'))) // -> Serving static files

app.use(helmet({ contentSecurityPolicy: false })) // -> Set security HTTP headers

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')) // -> Development logging
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour!',
})

app.use('/api', limiter) // -> Limit requests from the same API

app.use(express.json({ limit: '10kb' })) // -> Body parser, reading data from the body into req.body and limit size of the body
app.use(cookieParser())

app.use(mongoSanitize()) // -> Data sanitization against NoSQL query injection

app.use(xss()) // -> Data sanitization against XSS

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
) // -> Prevent parameter pollution

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.cookies)
  next()
}) // -> Test middleware

// app.use((req, res, next) => {
//   console.log('Hello from the middleware ❤');
//   next();
// });

// 3) ROUTES

app.use('/', viewRouter)
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/bookings', bookingRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
