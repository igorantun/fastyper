import React, { Component } from 'react'

import {
  Card,
  Avatar,
  Badge,
  Switch,
  Icon,
} from 'antd'

import './style.css'

class User extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ready: props.ready,
    }

    this.setReady = this.setReady.bind(this)
  }

  setReady (ready) {
    const { socket, token } = this.props

    this.setState({ ready })
    socket.emit('player.ready', ready, { token })
  }

  render () {
    const { name, token, running, players, score, position } = this.props
    const { ready } = this.state

    return (
      <Card noHovering bodyStyle={{padding: 10, display: 'flex'}}>
        <Avatar
          alt={name}
          shape='square'
          className='self-avatar'
          src={`https://api.adorable.io/avatars/96/${name}`}
        />

        <div className='self-info'>
          <div>
            <h2>{name}</h2>
            <Badge
              status={(!running && token) ? (ready ? 'success' : 'error') : 'processing'}
              text={running ? `score: ${score || 0}` : (token ? (ready ? 'ready' : 'not ready') : 'connecting')}
            />
          </div>

          {
            ! running
            ? <div className='self-ready-switch'>
                <Switch
                size='small'
                disabled={!token}
                defaultChecked={ready}
                onChange={this.setReady}
                />
                <span>Ready?</span>
              </div>
            : null
          }

        </div>

        { running
          ? <div className='self-ranking'>
              { position === 1 ? <Icon type='trophy' /> : null }

              <span>{position || players}
                <small> / {players}</small>
              </span>
            </div>
          : null
        }
      </Card>
    )
  }
}

export default User
