import { ITask } from "../model/types";
import {IActionAddTask, IActionMoveTask, IActionUpdateSeconds, IState} from "./types";
import { listKeys } from '../model'


    /////////////////
    //             //
    //   Actions   //
    //             //
    /////////////////


const actionTypes = {
    addTask:    'actionTypes.addTask',
    moveTask:   'actionTypes.moveTask',
    updateDate: 'actionTypes.updateDate',
};

export const addTaskAction = ({ label }: { label: string}): IActionAddTask => ({
    type: actionTypes.addTask,
    newTask: {
        id            : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        listKey       : listKeys.todo,
        label,
        createdAt     : new Date(),
        movedToWipAt  : null,
        movedToDoneAt : null,
    }
});

export const moveTaskAction = ({ id }: { id: string }): IActionMoveTask => ({
    type: actionTypes.moveTask,
    id
});

export const updateSecondsAction = (): IActionUpdateSeconds => ({
    type: actionTypes.updateDate,
});



    //////////////////////////
    //                      //
    //  State and reducers  //
    //                      //
    //////////////////////////


const getNow = () => Math.floor(Date.now() / 1000);

const defaultState
    : IState
    = {
    date: getNow(),
    tasks: []
};

export type TRootReducer = typeof defaultState;

export const rootReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.addTask:
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    (action as IActionAddTask).newTask
                ]
            };

        case actionTypes.moveTask:
            return {
                ...state,
                tasks: state.tasks.map((task: ITask) =>
                    task.id === (action as IActionMoveTask).id
                        ? {
                            ...task,
                            listKey: task.listKey === listKeys.todo
                                ? listKeys.wip
                                : listKeys.done,
                            movedToWipAt:  task.listKey === listKeys.todo ? getNow() : task.movedToWipAt,
                            movedToDoneAt: task.listKey === listKeys.wip  ? getNow() : task.movedToDoneAt,
                        }
                        : task
                )
            };

        case actionTypes.updateDate:
            return {
                ...state,
                date: getNow()
            };

        default:
            return state
    }
};
