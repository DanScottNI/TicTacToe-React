import React from 'react';

type MoveHistoryButtonProps = {
    bold?: boolean;
    value: string;
    onClick: (ev: any) => void;
};

export function MoveHistoryButton(props: MoveHistoryButtonProps) {
    return (
        <button className={props.bold ? "font-weight-bold" : ""} onClick={props.onClick} >
            { props.value}
        </button>
    );
}
