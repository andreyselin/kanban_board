export type TListKey = 'todo' | 'wip' | 'done';

export interface IAction {
    type: string;
}

export interface ITask {
    id            : string;
    listKey       : TListKey;
    label         : string;
    createdAt     : Date;
    movedToWipAt  : null | Date;
    movedToDoneAt : null | Date;
}

export type TNextListKey = Exclude<TListKey, 'done'>