const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.create({ email, password })
    const token = jwt.sign({ id: user._id }, '123')
    res.send({ token })
  } catch (err) {
    res.status(422).send(err.message)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(422).send('invalid password or email')

  const user = await User.findOne({ email })

  if (!user) res.status(404).send('email not found')

  const ValidPassword = await user.comparePassword(password)
  if (!ValidPassword) return res.status(422).send('invalid password or email')

  const token = jwt.sign({ id: user._id }, '123')
  res.send({ token })
})

module.exports = router
