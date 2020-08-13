import React, { Component } from 'react'
import "./board.css"
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'


var turn = "X"
var winner = "none"
var box
var check = false
var draw = false
var showDraw = "hide-draw"
export default class Board extends Component {

    constructor() {
        super();
        this.state = ({
            boxValue: [" ", " ", " ", " ", " ", " ", " ", " ", " "]

        })
    }

    reset() {
        winner = "none"
        showDraw = " hide-draw";
        box = "startGame"
        this.setState({ boxValue: [" ", " ", " ", " ", " ", " ", " ", " ", " "] })
    }

    bot() {
        do {
            let drawcheck = this.state.boxValue.filter(value => value === " ")
            console.log(drawcheck.length);
            if (!drawcheck.length) { check = false; showDraw = "show-draw" }
            var position = Math.floor(Math.random() * Math.floor(9))
            if (this.state.boxValue[position] === " ") {
                var botboxValue = [...this.state.boxValue]
                botboxValue[position] = "O"
                this.setState({ boxValue: botboxValue })
                check = false
            }

        }

        while (check)
    }

    handleClick(e) {
        check = true
        if (e.target.value === " ") {
            var playerboxValue = [...this.state.boxValue]
            playerboxValue[e.target.name] = "X"
            this.setState({ boxValue: playerboxValue })

        }

    }

    wonBy = (won) => {
        winner = won
        box = "endGame"
        showDraw = " hide-draw"
    }

    render() {
        (this.state.boxValue[0] === this.state.boxValue[1] && this.state.boxValue[1] === this.state.boxValue[2]) && (this.state.boxValue[2] === "X" && this.wonBy("X") || this.state.boxValue[2] === "O" && this.wonBy("O"));
        (this.state.boxValue[3] === this.state.boxValue[4] && this.state.boxValue[4] === this.state.boxValue[5]) && (this.state.boxValue[5] === "X" && this.wonBy("X") || this.state.boxValue[5] === "O" && this.wonBy("O"));
        (this.state.boxValue[6] === this.state.boxValue[7] && this.state.boxValue[7] === this.state.boxValue[8]) && (this.state.boxValue[8] === "X" && this.wonBy("X") || this.state.boxValue[8] === "O" && this.wonBy("O"));
        (this.state.boxValue[0] === this.state.boxValue[3] && this.state.boxValue[3] === this.state.boxValue[6]) && (this.state.boxValue[6] === "X" && this.wonBy("X") || this.state.boxValue[6] === "O" && this.wonBy("O"));
        (this.state.boxValue[1] === this.state.boxValue[4] && this.state.boxValue[4] === this.state.boxValue[7]) && (this.state.boxValue[7] === "X" && this.wonBy("X") || this.state.boxValue[7] === "O" && this.wonBy("O"));
        (this.state.boxValue[2] === this.state.boxValue[5] && this.state.boxValue[5] === this.state.boxValue[8]) && (this.state.boxValue[8] === "X" && this.wonBy("X") || this.state.boxValue[8] === "O" && this.wonBy("O"));
        (this.state.boxValue[0] === this.state.boxValue[4] && this.state.boxValue[4] === this.state.boxValue[8]) && (this.state.boxValue[8] === "X" && this.wonBy("X") || this.state.boxValue[8] === "O" && this.wonBy("O"));
        (this.state.boxValue[2] === this.state.boxValue[4] && this.state.boxValue[4] === this.state.boxValue[6]) && (this.state.boxValue[6] === "X" && this.wonBy("X") || this.state.boxValue[6] === "O" && this.wonBy("O"));
        check && this.bot()
        return (
            <div className="board" >
                <h1>Tic-Tac-Toe</h1>
                <h6>Bot</h6>
                <div className="game-board">
                    {this.state.boxValue.map((data, key) => <Button
                        className={box}
                        as="input"
                        type="button"
                        name={key}
                        value={data}
                        variant="outline-secondary"
                        style={{ borderRadius: "0" }}
                        onClick={(e) => this.handleClick(e)} />)}
                </div>
                <h3 className={winner} > {winner} Won</h3>
                <h3 className={showDraw} > Draw</h3>
                {/* <h6>Challange:Make Bot Win</h6> */}
                <Button onClick={(e) => this.reset()} style={{ margin: "10px" }}>Reset</Button>
            </div >
        )
    }
}
