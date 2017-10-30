import R from 'ramda'
import path from 'path'
import express from 'express'
import RoomManager from './classes/RoomManager'

const router = express.Router()

router
  .get('/room/:slug/status', (req, res) => {
    const room = RoomManager.find_room(req.params.slug)

    if (!room) {
      res.status(404).json({
        error: 'room not found',
      })
    }

    const players = R.map(R.pick(['name', 'ready', 'keystrokes', 'score']), room.players)

    res.json({
      slug: room.slug,
      status: room.status,
      created: room.created,
      active_since: room.active_since,
      active_users: room.active_users,
      players,
      keystrokes: room.keystrokes,
      mean: room.mean,
      below_mean: room.below_mean,
      ranking: room.ranking,
      last_minute_lead: room.last_minute_lead,
    })
  })

  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../webapp/build'))
  })

export default router
