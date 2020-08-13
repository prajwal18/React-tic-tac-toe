import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import Board from './Board'
import Bot from './Bot'

export default class Home extends Component {
    render() {
        return (
            <div className="buttons">
                <Button href="/" variant="info">Player Vs Player</Button>
                <Button href="/easy" variant="success">Bot</Button>
                <Button href="/hard" variant="danger">Hard</Button>
                <Button href="/tutorial" variant="danger">React Tutorial</Button>
            </div>
        )
    }
}
