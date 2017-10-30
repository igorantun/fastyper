import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import 'antd/dist/antd.css'
import './style.css'

import Game from './pages/Game'

import Header from './components/Header'
import Footer from './components/Footer'

import { Spin } from 'antd'


class App extends Component {
  constructor() {
    super()

    const endpoint = `${window.location.hostname}:9000`
    const socket = socketIOClient(endpoint)

    this.state = {
      socket,
      connected: false,
      token: '',
    }

    socket.on('connect', () => this.setState({ connected: true }))
    socket.on('disconnect', () => this.setState({ connected: false, token: '' }))
    socket.on('player.token', (data) => this.setState({ token: data }))
  }

  render() {
    const { socket, connected, token } = this.state

    return (
      <div className='app'>
        <Header/>

        <Spin tip='Connecting...' spinning={!connected} size='large'>
          <Switch>
            <Route
              path = '/room/:room'
              render={props =>
                <Switch>
                  <Route
                    path={`${props.match.path}/username/:name`}
                    render={props => <Game {...props} socket={socket} token={token} />}
                  />
                  <Redirect to={`/room/training/username/guest_${Date.now()}`}/>
                </Switch>}
            />
            <Redirect to={`/room/training/username/guest_${Date.now()}`}/>
          </Switch>
        </Spin>

        <Footer/>
      </div>
    )
  }
}

export default App
