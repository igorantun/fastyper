import Player from '../classes/Player'

import auth from './auth'
import join from './join'
import ready from './ready'
import type from './type'
import disconnect from './disconnect'

const connect = (io) => {
  io.on('connection', (socket) => {
    const player = new Player(socket.id)

    socket.emit('player.token', player.token)
    socket.use((packet, next) => auth(packet, next, player.token))

    socket.on('player.join', data =>
      join(socket, player, data))

    socket.on('player.ready', data =>
      ready(socket, player, data, io))

    socket.on('player.type', () =>
      type(socket, player))

    socket.on('disconnect', () =>
      disconnect(socket, player))
  })
}

export default connect
