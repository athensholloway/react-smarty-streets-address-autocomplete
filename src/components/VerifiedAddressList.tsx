import * as React from "react";

const VerifiedAddressList = (props: any) => {
    return props.verifiedAddresses && props.verifiedAddresses.length ? (
            <>
                <strong>Verified Addresses:</strong>
                <div>
                    {
                        props.verifiedAddresses.map((a: any, i: number) => <div key={i}>{a.deliveryLine1} {a.lastLine}</div>)
                    }
                </div>
            </>
        ) 
    : null;
}

export default VerifiedAddressList;