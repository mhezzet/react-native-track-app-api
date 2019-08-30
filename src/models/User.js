const mongoose = require('mongoose')
const bycrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function(next) {
  const user = this
  if (!user.isModified('password')) return next()

  const salt = await bycrypt.genSalt(10)
  user.password = await bycrypt.hash(user.password, salt)
  next()
})

userSchema.methods.comparePassword = function(inputPassword) {
  const user = this
  return bycrypt.compare(inputPassword, user.password)
}

const User = mongoose.model('user', userSchema)

module.exports = User
