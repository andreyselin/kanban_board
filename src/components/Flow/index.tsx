import * as React from "react";
import { listKeys } from "../../model";
import { Task } from "../Task";
import { connect, ConnectedProps } from "react-redux";
import { IState } from "../../redux-stuff/types";
import { addTaskAction } from "../../redux-stuff";
import { ITask } from "../../model/types";


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

    const addTaskOnClick = () => {
        const label = window.prompt('Напишите описание задачи');
        label && addTaskAction({ label });
    };

    return (
        <div style={ styles.flow }>
            { Object.keys(listKeys).map(listKey => (
                <div style={ styles.column }>
                    <div style={ styles.header }>{ listKey }</div>
                    {
                        (tasks as ITask[])
                            .filter(task => task.listKey === listKey)
                            .map(task => ( <Task task={ task } /> ))
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
