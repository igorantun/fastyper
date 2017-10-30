/* Requires */
import socketIo from 'socket.io'
import express from 'express'
import morgan from 'morgan'
import http from 'http'
import path from 'path'

import routes from './routes'
import connect from './socket'


/* Setup */
const app = express()
app.set('json spaces', 2)

// Websocket
const server = http.Server(app)
connect(socketIo(server))

// Logging
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Static
app.use(express.static(path.join(__dirname, '../../webapp/build')))

/* Routes */
app.use(routes)


/* Exports */
module.exports = server
