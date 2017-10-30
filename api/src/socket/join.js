import R from 'ramda'
import RoomManager from '../classes/RoomManager'

const join = (socket, player, data) => {
  player.room = data.room
  player.name = data.name

  const room =
    RoomManager.find_room(player.room) || RoomManager.create_room(player.room)

  room.add_player(player)
  socket.join(player.room)
  socket.to(player.room).emit('player.joined', player.public_data)
  socket.emit('self.joined', {
    quote: room.quote,
    players: R.filter(p => p.id !== player.id, room.players)
  })
}

export default join
