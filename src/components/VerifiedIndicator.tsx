import * as React from "react";

export default (props: any) => {
    return (<small>{props.verified ? "\u2714 Verified" : "Not Verified"}</small>);
};