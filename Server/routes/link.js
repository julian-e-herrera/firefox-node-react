const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post(
  '/',
  [check('name', 'Upload file').not().isEmpty(), check('name_original', 'Upload file').not().isEmpty()],
  auth,
  linkController.newLink
)

module.exports = router
