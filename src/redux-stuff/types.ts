import { IAction, ITask } from "../model/types";

export interface IState {
    date: number,
    tasks: ITask[]
}

export interface IActionAddTask extends IAction {
    newTask: ITask
}

export interface IActionMoveTask extends IAction {
    id: string;
}

export interface IActionUpdateSeconds extends IAction {
}
