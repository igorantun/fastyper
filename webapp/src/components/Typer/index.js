import React, { Component } from 'react'
import './style.css'

import {
  Card,
  Input,
  Icon,
  Progress,
} from 'antd'

class Typer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      typed: '',
    }

    this.sendKey = this.sendKey.bind(this)
  }

  componentDidUpdate () {
    if(this.props.running) {
      this.input.focus()
    }
  }

  sendKey (event) {
    const { socket, token } = this.props
    const lastChar = event.target.value.slice(-1)

    socket.emit('player.type', {
      typed: lastChar,
      time: Date.now(),
    }, { token })

    this.setState({ typed: event.target.value })
  }

  render () {
    const { typed } = this.state
    const { quote, running } = this.props

    return (
      <div>
        <Card loading={!quote} noHovering bodyStyle={{padding: 10}}>
          <div className='quote'>
            {quote}
          </div>
        </Card>

        <Input
          size='large'
          disabled={!running}
          placeholder='Type here'
          onChange={this.sendKey}
          prefix={<Icon type='right' />}
          ref={input => this.input = input}
        />

        <Progress
          strokeWidth={5}
          showInfo={false}
          percent={((typed.length / quote.length) * 100) || 0}
        />
      </div>
    )
  }
}

export default Typer
