import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './style.css'

import User from '../../components/User'
import Typer from '../../components/Typer'
import Player from '../../components/Player'

import {
  Row,
  Col,
  message,
} from 'antd'

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quote: '',
      players: [],
      ranking: [],
      running: false,
      room: props.match.params.room,
      name: props.match.params.name,
    }
  }

  componentDidMount () {
    const { socket } = this.props

    socket.on('self.joined', ({ quote, players }) =>
      this.setState({ quote, players }))

    socket.on('player.joined', (player) =>
      this.setState({ players: this.state.players.concat(player) }))

    socket.on('player.left', (id) =>
      this.setState({ players: this.state.players.filter(i => i.id !== id) }))

    socket.on('player.ready', (player) =>
      this.setState({ players: [...this.state.players.filter(i => i.id !== player.id), player] }))

    socket.on('game.ranking', (ranking) =>
      this.setState({ ranking }))

    socket.on('game.start', () => {
      const warnStart = (sec) => {
        setTimeout(() =>
          message.info(`Game starting in ${sec}`, 0.5),
          (5 - sec) * 1000)
      }

      [5, 4, 3, 2, 1].forEach(warnStart)

      setTimeout(() => {
        message.success('Game started', 1)
        this.setState({ running: true })
      }, 5000)
    })
  }

  componentWillReceiveProps (props) {
    const { socket, token } = props
    const { room, name } = this.state

    if(token) {
      socket.emit('player.join', { room, name }, { token })
    }
  }

  render () {
    const { socket, token } = this.props
    const { running, name, ready, quote, players, ranking } = this.state

    return (
      <Row className='game' gutter={48} type='flex' justify='center' style={{margin:0}}>
        <Col span={12}>
          <h2>Text</h2>
          <Typer quote={quote} socket={socket} token={token} running={running} />
        </Col>

        <Col span={6}>
          <div>
            <h2>You</h2>
            <User
              name={name}
              ready={ready}
              players={players.length + 1}
              score={ranking[socket.id] ? ranking[socket.id].score : 0}
              position={ranking[socket.id] ? ranking[socket.id].position : 0}

              socket={socket} token={token} running={running}
            />
          </div>

          <div className='sidebar-players'>
            <h2>Players</h2>
            <ReactCSSTransitionGroup transitionName='sidebar-player' transitionEnterTimeout={700} transitionLeaveTimeout={700}>
              {
                players
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(player =>
                    <Player
                      name={player.name}
                      ready={player.ready}
                      players={players.length + 1}
                      score={ranking[player.id] ? ranking[player.id].score : 0}
                      position={ranking[player.id] ? ranking[player.id].position : 0}

                      style={{marginBottom: 10}}
                      key={player.id} running={running}
                    />
                  )
              }
            </ReactCSSTransitionGroup>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Game
