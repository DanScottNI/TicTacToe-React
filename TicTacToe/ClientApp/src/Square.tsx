import React from 'react';
import ReactDOM from 'react-dom';

type ISquareProps = {
    value: string;
    onClick: (ev: any) => void;
}

export function Square(props: ISquareProps) {
    return (

        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}