import * as React from "react";
import {ITask, TListKey, TNextListKey} from "../model/types";
import {listKeys} from "../model";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {moveTaskAction, TRootReducer} from "../redux-stuff";
import {IState} from "../redux-stuff/types";
import {Time} from "./Time";

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

const mapState = (state: IState) => ({
    date: state.date
});
const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type _TPropsFromRedux = ConnectedProps<typeof connector>

interface _TProps extends _TPropsFromRedux {
    task: ITask
}

const _RawTask = ({ task, date } : _TProps) => {

    const dispatch = useDispatch();

    const moveForward = () => {
        dispatch(moveTaskAction({ id: task.id }));
    };

    return (<div style={ styles.task }>
        <div style={ styles.label }>{ task.label }</div>

        { task.listKey === listKeys.wip && (
            <div style={ styles.timeInProgress }><Time start= { (task.movedToWipAt || 0) } end={ date } /></div>
        )}

        { task.listKey === listKeys.done && (
            <div style={ styles.timeInProgress }><Time start= { (task.movedToWipAt || 0) } end={ (task.movedToDoneAt as number) } /></div>
        )}

        { task.listKey !== listKeys.done && (
            <button onClick={ () => moveForward() }>{
                nextListLabels[ task.listKey as TNextListKey ]
            }</button>
        )}

    </div>)
};

export const Task = connector(_RawTask);
