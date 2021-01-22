const express = require('express')
const { protect, restrictTo } = require('../controllers/authController')
const {
  getAllUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../controllers/userController')

const {
  signUp,
  login,
  resetPassword,
  forgotPassword,
  updatePassword,
  logout,
} = require('../controllers/authController')

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect) // -> All the routes after this will be protect!

router.patch('/updateMyPassword', updatePassword)

router.get('/me', getMe, getUser)
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe)
router.delete('/deleteMe', deleteMe)

router.use(restrictTo('admin')) // -> All the routes after this will be restric!

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
