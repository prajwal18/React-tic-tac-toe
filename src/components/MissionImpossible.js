import React, { Component } from 'react'
import "./board.css"
// import { Button } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'


var turn = "X"
var winner = "none"
var box
var botTurn = false
var draw = false
var showDraw = "hide-draw"
var twinCheck = false
let twinSolved = true
export default class Board extends Component {

    constructor() {
        super();
        this.state = ({
            boxValue: [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]]
        })
    }

    reset() {
        winner = "none"
        showDraw = " hide-draw";
        box = "startGame"
        twinSolved = true
        this.setState({
            boxValue: [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "]]
        })
    }

    bot() {
        let botboxValue = [...this.state.boxValue]
        let emptyBox = this.state.boxValue.map(row => row.filter(value => value === " "))
        let emptyCorners = false
        let drawcheck = emptyBox.filter(row => row.length)
        let rowDefend = false
        let specificRow
        let speceficCol
        let rowWin
        let rowCol
        let colWin

        if (!drawcheck.length) { botTurn = false; showDraw = "show-draw" }

        let rowDefendCheck
        let rowWinCheck
        let colSet
        let colDefendCheck
        let colDefend
        let boxArray = []


        for (let i = 0; i < 3; i++) {
            colSet = ""
            let rowSet = this.state.boxValue[i].filter(data => data !== " ")
            if (new Set(rowSet).size !== rowSet.length && new Set(rowSet).size === 1) {
                rowDefendCheck = true
                if (!(new Set(rowSet).has("X"))) rowWinCheck = "true"
            }
            for (let j = 0; j < 3; j++) {
                boxArray.push(botboxValue[i][j])
                if ((i + j) % 2 === 0 && botboxValue[i][j] === " ") {
                    emptyCorners = true
                }
                if (rowDefendCheck && botboxValue[i][j] === " ") {
                    specificRow = i
                    speceficCol = j
                    rowDefend = true
                    rowDefendCheck = false

                }
                if (rowWinCheck && botboxValue[i][j] === " ") {
                    rowCol = "" + i + j
                    rowWin = true
                    console.log(i);
                    rowWinCheck = false

                }
                if (botboxValue[j][i] !== " ")
                    colSet = colSet + botboxValue[j][i]
            }
            if (new Set(colSet).size !== colSet.length && new Set(colSet).size === 1) {
                colDefend = true
                speceficCol = i
                if (!new Set(colSet).has("X")) {
                    colWin = true
                    speceficCol = i
                }
                console.log(new Set(colSet).size !== colSet.length);
            }
            // console.log(colDefend);


        }

        let count = 0
        let indexOddCheck = 0
        // console.log(boxArray);
        boxArray.filter((data, index) => {
            if (data === "X") {
                indexOddCheck = indexOddCheck + index
                count++
            }
        })

        if (count === 2 && indexOddCheck % 2 !== 0)
            twinCheck = true
        // console.log(count, indexOddCheck);
        do {
            let row = Math.floor(Math.random() * Math.floor(3))
            let col = Math.floor(Math.random() * Math.floor(3))
            if (this.state.boxValue[row][col] === " ") {
                if (botboxValue[1][1] === " ") {
                    botboxValue[1][1] = "O"
                    botTurn = false
                }
                else if (rowWin) {
                    console.log(rowCol);
                    botboxValue[rowCol.charAt(0)][rowCol.charAt(1)] = "O"
                    botTurn = false
                }
                else if (colWin) {
                    // console.log(rowCol);
                    // botboxValue[rowCol.charAt(0)][rowCol.charAt(1)] = "O"
                    // botTurn = false

                    if (botboxValue[row][speceficCol] === " ") {
                        botboxValue[row][speceficCol] = "O"
                        botTurn = false
                        colDefend = false
                        console.log("colWin");
                    }

                }

                else if (colDefend) {
                    if (botboxValue[row][speceficCol] === " ") {
                        botboxValue[row][speceficCol] = "O"
                        botTurn = false
                        colDefend = false
                        console.log("colDeffend");
                    }
                }
                else if (rowDefend) {
                    botboxValue[specificRow][speceficCol] = "O"
                    botTurn = false
                    console.log("rowDeffend");
                }
                else if (twinCheck && twinSolved) {
                    if ((row + col) % 2 !== 0) {
                        botboxValue[row][col] = "O"
                        botTurn = false
                        twinCheck = false
                        twinSolved = false
                        console.log("twincheck");
                    }
                }
                else if (emptyCorners) {
                    console.log("emptyCorners");
                    if ((row + col) % 2 === 0) {
                        botboxValue[row][col] = "O"
                        botTurn = false
                    }

                }
                else {
                    botboxValue[row][col] = "O"
                    botTurn = false

                }
            }
        }
        while (botTurn)
        this.setState({ boxValue: botboxValue })
    }

    handleClick(e) {
        botTurn = true
        if (e.target.value === " ") {
            var playerboxValue = this.state.boxValue
            playerboxValue[e.target.name.charAt(0)][e.target.name.charAt(1)] = "X"
            this.setState({ boxValue: playerboxValue })
        }
    }

    wonBy = (won) => {
        winner = won
        box = "endGame"
        showDraw = " hide-draw"
    }

    render() {
        let boxincline = ""
        for (let i = 0; i < 3; i++) {
            let boxCol = ""
            let boxdecline = ""
            let boxRow = this.state.boxValue[i].join('')
            for (let j = 0; j < 3; j++) {
                boxCol = boxCol + this.state.boxValue[j][i]
                boxdecline = boxdecline + this.state.boxValue[j][j]
                if (i + j === 2)
                    boxincline = boxincline + this.state.boxValue[i][j]
            }
            boxRow === "OOO" && this.wonBy("O") || boxRow === "XXX" && this.wonBy("X")
            boxCol === "OOO" && this.wonBy("O") || boxCol === "XXX" && this.wonBy("X")
            boxdecline === "OOO" && this.wonBy("O") || boxdecline === "XXX" && this.wonBy("X")
            boxincline === "OOO" && this.wonBy("O") || boxincline === "XXX" && this.wonBy("X")
            if (boxincline === "XOX" || boxdecline === "XOX") twinCheck = true
        }

        botTurn && this.bot()

        const boxButton = []

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                boxButton.push(
                    <Button
                        className={box}
                        as="input"
                        type="button"
                        name={`${i}${j}`}
                        value={this.state.boxValue[i][j]}
                        variant="outline-secondary"
                        style={{ borderRadius: "0" }}
                        onClick={(e) => this.handleClick(e)}
                    />)

        return (
            <div className="board" >
                <h1>Tic-Tac-Toe</h1>
                <h6>Hard</h6>
                <div className="game-board">
                    {boxButton}
                </div>
                <h3 className={winner} > {winner} Won</h3>
                <h3 className={showDraw} > Draw</h3>
                <Button onClick={(e) => this.reset()} style={{ margin: "10px" }}>Reset</Button>
            </div >
        )
    }
}
