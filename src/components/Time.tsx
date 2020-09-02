import * as React from "react";

export const Time = ({start, end}: {start: number, end: number}) => {
    let result = end - start;
    return (<>{ result < 0 ? 0 : result }</>);
};
