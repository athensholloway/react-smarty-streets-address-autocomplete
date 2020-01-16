import * as React from "react";
import * as ReactDOM from "react-dom";


import AddressForm from "./components/AddressForm";
import Address from "./models/Address";

const address: Address = {
    line1: "500 Volvo Pkwy",
    line2: "",
    city: "Chesapeake",
    state: "VA",
    zip: "23320",
    verified: true,
    sameMailingAddress: true,
    sameJanuaryAddress: false
  };


ReactDOM.render(
    <AddressForm address={address} enableSameMailingAddress={true} enableSameJanuaryAddress={true} />,
    document.getElementById("app")
);
