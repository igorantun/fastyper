import R from 'ramda'
import Room from './Room'

class RoomManager {
  constructor () {
    this.rooms = []
  }

  create_room (slug) {
    this.rooms = R.append(new Room(slug), this.rooms)
    return this.find_room(slug)
  }

  remove_room (slug) {
    this.rooms = R.reject(R.propEq('slug', slug), this.rooms)
  }

  find_room (slug) {
    return R.find(R.propEq('slug', slug), this.rooms)
  }
}


export default new RoomManager()
