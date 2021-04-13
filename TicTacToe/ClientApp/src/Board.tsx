import React from 'react';
import { Square } from './Square';

type BoardProps = {
    onClick: (ev: any) => void;
    squares: string[];
}

export class Board extends React.Component<BoardProps> {

    renderSquare(i: number) {
        return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let rows: number[] = [0, 1, 2];
        let columns: number[] = [0, 1, 2];
        return (
            <div>
                {rows.map((row, rowIndex) => <div className="board-row">
                    {columns.map((col, colindex) => this.renderSquare((row * (columns.length)) + col))}
                </div>)}
            </div>
        );
    }
}