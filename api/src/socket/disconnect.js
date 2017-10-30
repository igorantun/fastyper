import RoomManager from '../classes/RoomManager'

const disconnect = (socket, player) => {
  const room = RoomManager.find_room(player.room)

  if (room) {
    room.remove_player(player.id)

    if (room.active_users === 0) {
      RoomManager.remove_room(player.room)
    } else {
      socket.to(player.room).emit('player.left', player.id)
    }
  }
}

export default disconnect
