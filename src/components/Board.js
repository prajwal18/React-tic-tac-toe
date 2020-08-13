import React, { Component } from 'react'
import "./board.css"
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'


var turn = "X"
var winner = "none"
var box
export default class Board extends Component {

    constructor() {
        super();
        this.state = ({
            a: " ",
            b: " ",
            c: " ",
            d: " ",
            e: " ",
            f: " ",
            g: " ",
            h: " ",
            i: " "
        })
    }

    reset() {
        winner = "none"
        box = "startGame"
        for (const [key, value] of Object.entries(this.state)) {
            this.setState({ [key]: " " })
        }
    }

    handleClick = (e) => {
        if (e.target.value === " ") {
            this.setState({ [e.target.name]: turn })
            turn === "X" ? turn = "O" : turn = "X"
        }
        // e.target.style.pointerEvents = "none";
    }

    wonBy = (won) => {
        winner = won
        box = "endGame"
    }

    render() {
        (this.state.a === this.state.b && this.state.b === this.state.c) && (this.state.c === "X" && this.wonBy("X") || this.state.c === "O" && this.wonBy("O"));
        (this.state.d === this.state.e && this.state.e === this.state.f) && (this.state.f === "X" && this.wonBy("X") || this.state.f === "O" && this.wonBy("O"));
        (this.state.g === this.state.h && this.state.h === this.state.i) && (this.state.i === "X" && this.wonBy("X") || this.state.i === "O" && this.wonBy("O"));
        (this.state.a === this.state.d && this.state.d === this.state.g) && (this.state.g === "X" && this.wonBy("X") || this.state.g === "O" && this.wonBy("O"));
        (this.state.b === this.state.e && this.state.e === this.state.h) && (this.state.h === "X" && this.wonBy("X") || this.state.h === "O" && this.wonBy("O"));
        (this.state.c === this.state.f && this.state.f === this.state.i) && (this.state.i === "X" && this.wonBy("X") || this.state.i === "O" && this.wonBy("O"));
        (this.state.a === this.state.e && this.state.e === this.state.i) && (this.state.i === "X" && this.wonBy("X") || this.state.i === "O" && this.wonBy("O"));
        (this.state.c === this.state.e && this.state.e === this.state.g) && (this.state.g === "X" && this.wonBy("X") || this.state.g === "O" && this.wonBy("O"));


        const boxButton = []

        for (const [key, value] of Object.entries(this.state))
            boxButton.push(
                <Button
                    className={box}
                    variant="outline-secondary"
                    as="input"
                    type="button"
                    name={key}
                    value={value}
                    onClick={(e) => this.handleClick(e)}
                    style={{ borderRadius: "0" }}
                />
            )



        return (
            <div className="board" >
                <h1>Tic-Tac-Toe</h1>
                <h6>Player Vs Player</h6>
                <div className="game-board">
                    {boxButton}
                </div>
                <h3 className={winner} > {winner} Won</h3>
                <Button onClick={(e) => this.reset()} style={{ margin: "8px" }}>Reset</Button>
            </div >
        )
    }
}
