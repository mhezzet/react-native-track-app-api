const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = function(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) res.status(401).send('u r not logged in')
  const token = authorization.replace('Bearer ', '')

  jwt.verify(token, '123', async (err, payload) => {
    if (err) return res.status(401).send('u r not logged in')
    const { id } = payload
    const user = await User.findById(id)
    req.user = {
      email: user.email,
      id: user.id
    }
    next()
  })
}
