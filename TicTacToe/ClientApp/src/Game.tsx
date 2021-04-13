﻿import React from 'react';
import { Board } from './Board';
import { calculateWinner } from './index';

interface IGameProps {

}

interface IGameHistory {
    squares: string[];
}

interface IGameState {
    history: IGameHistory[];
    stepNumber: number;
    xIsNext: boolean;
    squares?: string[];
}

export class Game extends React.Component<IGameProps, IGameState> {
    constructor(props: IGameProps) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i: number) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step: number) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move, array: IGameHistory[]) => {
            let desc = 'Go to game start';

            if (move > 0) {
                desc = 'Go to move #' + move;

                // Calculate which square changed last.
                let difference: number = 0;

                for (let i = 0; i < step.squares.length; i++) {
                    if (step.squares[i] !== array[move - 1].squares[i]) {
                        difference = i;
                    }
                }

                desc += " (the square at row: " + (Math.floor(difference / 3) + 1) + " column: " + ((difference % 3) + 1) + " changed to " + step.squares[difference];
            }

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = "Winner: " + winner;
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}