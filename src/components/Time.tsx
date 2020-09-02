import * as React from "react";

export const Time = ({start, end}: {start: number, end: number}) => {
    let diff = end - start;
    return (<>{ new Date((diff < 0 ? 0 : diff) * 1000).toISOString().substr(11, 8) }</>);
};
