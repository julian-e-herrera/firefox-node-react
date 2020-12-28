const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' })
const { validationResult } = require('express-validator')

exports.authenticateUser = async (req, res, next) => {
  const msgErrors = validationResult(req)

  if (!msgErrors.isEmpty()) {
    return res.status(400).json({ msgErrors: msgErrors.array() })
  }

  const { email, password } = req.body
  const user = await User.findOne({ email })
  //console.log(user)

  if (!user) {
    res.status(401).json({ msg: "user doesn't exist" })
    return next()
  }

  if (bcrypt.compareSync(password, user.password)) {
    //jwt
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.SW,
      {
        expiresIn: '8h',
      }
    )
    res.json({ token })
  } else {
    res.status(401).json({ msg: 'incorrect password' })
  }
}
exports.userAuth = async (req, res, next) => {
  res.json({ user: req.user })
}
