const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')
const filesController = require('../controllers/filesController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

router.post(
  '/',
  [check('name', 'Upload file').not().isEmpty(), check('name_original', 'Upload file').not().isEmpty()],
  auth,
  linkController.newLink
)

router.get(
  '/:url',

  linkController.getLink,
  filesController.deleteFile
)

module.exports = router
