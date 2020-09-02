import {TListKey} from "./types";

export const listKeys: {
    [ key in TListKey ]: key
} = {
    todo: "todo",
    wip:  "wip",
    done: "done"
};