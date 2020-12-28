const Users = require('../models/Users')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.newUser = async (req, res) => {
  const msgErrors = validationResult(req)

  if (!msgErrors.isEmpty()) {
    return res.status(400).json({ msgErrors: msgErrors.array() })
  }

  const { email, password } = req.body
  let user = await Users.findOne({ email })

  if (user) {
    return res.status(400).json({ msg: 'the user is registered' })
  }

  user = new Users(req.body)
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)
  try {
    await user.save()
    res.json({ msg: 'create user success' })
  } catch (error) {
    console.log(error)
  }
}
