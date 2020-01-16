import * as React from "react";

const AddressAutoCompleteList = (props: any) => {
    return props.suggestedAddresses && props.suggestedAddresses.length ? (
            <div className="address-autocomplete">
                {
                    props.suggestedAddresses.map((a: any, i: number) => <div key={i} onClick={() => props.addressSelected(a)} >{a.streetLine} {a.city} {a.state}</div>)
                }
            </div>
        ) 
    : null;
}

export default AddressAutoCompleteList;