const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

router.post(
  '/',
  [
    check('name', 'name incomplete').not().isEmpty(),
    check('email', ' complete valid email').isEmail(),
    check('password', 'password must be completed at leat 6 chars').isLength({ min: 6 }),
  ],
  userController.newUser
)

module.exports = router
