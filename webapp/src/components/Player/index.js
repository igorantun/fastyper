import React from 'react'
import './style.css'

import {
  Avatar,
  Badge,
  Card,
  Icon,
} from 'antd'

const Player = (props) =>
  <Card className='player-card' noHovering bodyStyle={{padding: 10, display: 'flex'}}>
    <Avatar
      size='large'
      shape='square'
      alt={props.name}
      src={`https://api.adorable.io/avatars/40/${props.token}`}
    />

    <div className='player-info'>
      <h3>{props.name}</h3>
      <Badge
        status={props.running ? 'warning' : (props.ready ? 'success' : 'error')}
        text={props.running ? `score: ${props.score}` : (props.ready ? 'ready' : 'not ready')}
      />
    </div>

    { props.running
      ? <div className='self-ranking'>
          { props.position === 1 ? <Icon type='trophy' /> : null }

          <span>{props.position || props.players}
            <small> / {props.players}</small>
          </span>
        </div>
      : null
    }
  </Card>

export default Player
