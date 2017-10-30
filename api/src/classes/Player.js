import R from 'ramda'
import uuid from 'uuid/v4'
import RoomManager from './RoomManager'

class Player {
  constructor (id) {
    this.id = id
    this.name = ''
    this.ready = false
    this.token = uuid()
    this.keystrokes = 0
    this.room = null
  }

  inc_keystrokes () {
    this.keystrokes = R.inc(this.keystrokes)
  }

  get score () {
    const room = RoomManager.find_room(this.room)

    return Math.round((this.keystrokes * 60) / room.active_since) || 0
  }

  get public_data () {
    return R.pick(['id', 'name', 'ready', 'keystrokes', 'score'])(this)
  }
}


/* Exports */
export default Player
