import * as React from "react";
import { listKeys } from "../model/index";
import { Task } from "./Task";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import { IState } from "../redux-stuff/types";
import {addTaskAction, updateSecondsAction} from "../redux-stuff/index";
import { ITask } from "../model/types";
import {useEffect, useState} from "react";


const styles = {
    flow: {
        display: 'flex',
        width: '800px',
    },
    column: {
        margin: '5px',
        width: '33.33%',
        padding: '5px 5px 0',
        boxSizing: "border-box" as 'border-box',
        border: '1px solid silver',
        borderRadius: '8px'
    },
    header: {
        marginBottom: '5px',
        padding: '5px',
        borderBottom: '1px solid silver',
    },
    item: {
        marginBottom: '5px',
        width: '100%',
        padding: '5px',
        background: 'silver',
        border: '1px solid silver',
        borderRadius: '5px'
    }
};


const mapState = (state: IState) => ({
    tasks: state.tasks
});

type _TProps = ConnectedProps<{ tasks: ITask[] }>;

const RawFlow = ({ tasks }: _TProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(
            () => dispatch(updateSecondsAction()),
            1000
        );
        return () => clearInterval(timer);
    });

    const addTaskOnClick = () => {
        const label = window.prompt('Напишите описание задачи');
        label && dispatch(addTaskAction({ label }));
    };

    return (
        <div style={ styles.flow }>
            { Object.keys(listKeys).map(listKey => (
                <div key={ listKey } style={ styles.column }>
                    <div style={ styles.header }>{ listKey }</div>
                    {
                        (tasks && tasks as ITask[])
                            .filter(task => task.listKey === listKey)
                            .map(task => ( <Task key={task.id} task={ task } /> ))
                    }{
                        listKey === listKeys.todo && (
                            <button style={ styles.item } onClick={ addTaskOnClick }>Новая задача</button>
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export const Flow = connect(mapState, null)(RawFlow);
