import * as React from "react";

export default (props: any) => {
    return props.show ? (
        <div>
            <label className="same-address"><input type="checkbox" checked={props.checked} onChange={props.onClick} /> {props.label}</label>
        </div>
        ) 
    : null;
};