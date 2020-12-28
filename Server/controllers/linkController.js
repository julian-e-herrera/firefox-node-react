const Link = require('../models/Link')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
exports.newLink = async (req, res, next) => {
  const msgErrors = validationResult(req)

  if (!msgErrors.isEmpty()) {
    return res.status(400).json({ msgErrors: msgErrors.array() })
  }

  const { name_original } = req.body

  //create
  const link = new Link()
  link.url = shortid.generate()
  link.name = shortid.generate()
  link.name_original = name_original

  if (req.user) {
    const { password, downloads } = req.body
    if (downloads) {
      link.downloads = downloads
    }
    if (password) {
      const salt = await bcrypt.genSalt(10)

      link.password = await bcrypt.hash(password, salt)
    }
    link.author = req.user.id
  }
  //save into db
  try {
    await link.save()

    return res.json({ msg: `${link.url}` })
    next()
  } catch (error) {
    console.log(error)
  }
}

exports.getLink = async (req, res, next) => {
  console.log(req.params.url)
  const url = req.params.url
  const link = await Link.findOne({ url })

  if (!link) {
    res.status(404).json({ msg: 'link does not exist' })
    return next()
  }

  res.json({ file: link.name })

  const { downloads, name } = link
  if (downloads === 1) {
    req.file = name

    await Link.findOneAndRemove(req.params.url)
    next()
  } else {
    link.downloads--
    link.save()
  }
}
