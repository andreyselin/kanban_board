import * as React from "react";
// @ts-ignore
import styles from './styles.css';
import {ITask, TListKey, TNextListKey} from "../../model/types";
import {listKeys} from "../../model";

type _TProps = {
    task: ITask
};

const nextListKeys: {
    [ key in TNextListKey ]: TListKey
} = {
    [ listKeys.todo ]: listKeys.wip,
    [ listKeys.wip  ]: listKeys.done,
};

const nextListLabels: {
    [ key in TNextListKey ]: string
} = {
    [ listKeys.todo ]: 'Начать',
    [ listKeys.wip  ]: 'Завершить'
};

export const Task = ({ task } : _TProps) => {

    const moveToList = (targetListKey: TListKey) => {
        console.log({ targetListKey });
    };

    return (<div className={ styles.task }>
        <div className={ styles.labels }>{ task.label }</div>

        { task.listKey === listKeys.wip && (
            <div className={ styles.timeInProgress }>{ task.movedToWipAt }</div>
        )}

        { task.listKey !== listKeys.done && (
            <button onClick={ () => moveToList(nextListKeys[ task.listKey as TNextListKey ]) }>{
                nextListLabels[ task.listKey as TNextListKey ]
            }</button>
        )}

    </div>)
};