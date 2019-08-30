const express = require('express')
const requireAuth = require('../middlewares/requireAuth')
const Track = require('../models/Track')

const router = express.Router()

router.get('/tracks', requireAuth, async (req, res) => {
  const userId = req.user.id

  const tracks = await Track.find({ userId })

  return res.send(tracks)
})

router.post('/tracks', requireAuth, async (req, res) => {
  const { name, locations } = req.body
  if (!name || !locations)
    return res.status(422).send('you must provide a name and locations')

  try {
    const track = await Track.create({ name, locations, userId: req.user.id })

    res.send(track)
  } catch (err) {
    res.status(422).send(err.message)
  }
})

module.exports = router
