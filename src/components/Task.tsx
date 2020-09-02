import * as React from "react";
import {ITask, TListKey, TNextListKey} from "../model/types";
import {listKeys} from "../model/index";
import {useDispatch} from "react-redux";
import {moveTaskAction} from "../redux-stuff/index";

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

const styles = {
    label: {
        marginBottom: '4px',
    },
    timeInProgress: {},
    task: {
        marginBottom: '5px',
        padding: '5px',
        background: '#f5f5f5',
        border: '1px solid silver',
        borderRadius: '5px'
    }
};

export const Task = ({ task } : _TProps) => {

    const dispatch = useDispatch();

    const moveToList = (targetListKey: TListKey) => {
        dispatch(moveTaskAction({ id: task.id }));
    };

    return (<div style={ styles.task }>
        <div style={ styles.label }>{ task.label }</div>

        { task.listKey === listKeys.wip && (
            <div style={ styles.timeInProgress }>{ task.movedToWipAt }</div>
        )}

        { task.listKey !== listKeys.done && (
            <button onClick={ () => moveToList(nextListKeys[ task.listKey as TNextListKey ]) }>{
                nextListLabels[ task.listKey as TNextListKey ]
            }</button>
        )}

    </div>)
};
