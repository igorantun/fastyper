import RoomManager from '../classes/RoomManager'

const sendRanking = (io, player) => {
  const room = RoomManager.find_room(player.room)
  const ranking = {}

  if(!room || !room.everyone_ready) {
    return
  }

  room.id_ranking.forEach((element, index) =>
    ranking[element[0]] = {
      score: element[1],
      position: index + 1
    })

  io.in(player.room).emit('game.ranking', ranking)
  setTimeout(() => sendRanking(io, player, room), 500)
}

const ready = (socket, player, data, io) => {
  player.ready = data

  const room = RoomManager.find_room(player.room)

  socket.to(player.room).emit('player.ready', player.public_data)

  if (room.everyone_ready) {
    room.start_game()
    io.in(player.room).emit('game.start')

    sendRanking(io, player, room)
  }
}

export default ready
