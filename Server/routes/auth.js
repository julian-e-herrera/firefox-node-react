const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post(
  '/',
  [check('email', 'Put valid email').isEmail(), check('password', 'Password cannot be empty').not().isEmpty()],

  authController.authenticateUser
)

router.get('/', auth, authController.userAuth)

module.exports = router
