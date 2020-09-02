import { ITask, TListKey } from "../model/types";
import {IActionAddTask, IActionMoveTask, IState} from "./types";
import { listKeys } from '../model'



const actionTypes = {
    addTask:  'actionTypes.addTask',
    moveTask: 'actionTypes.moveTask',
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
    type: actionTypes.addTask,
    id
});



    //////////////////////////
    //                      //
    //  State and reducers  //
    //                      //
    //////////////////////////



const defaultState: IState = {
    tasks: []
};

export const rootReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.addTask:
            return {
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
                                : listKeys.done
                        }
                        : task)
            };

        default:
            return state
    }
};