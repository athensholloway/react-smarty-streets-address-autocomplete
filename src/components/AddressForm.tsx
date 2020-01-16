import * as React from "react";
import Address from "../models/Address";
import AddressAutoCompleteList from "./AddressAutoCompleteList";
import VerifiedAddressList from "./VerifiedAddressList";
import { AddressAutoCompleteService, SuggestedAddress } from "../service/AddressAutoComplete";
import { VerifyAddressService, VerifiedAddress } from "../service/VerifyAddress";
import Checkbox from "./Checkbox";
import VerifiedIndicator from "./VerifiedIndicator";

interface AddressFormProps {
    address: Address; 
    enableSameMailingAddress: boolean; 
    enableSameJanuaryAddress: boolean
}
interface AddressFormState {
    address: Address;
    sameMailingAddress: boolean;
    sameJanuaryAddress: boolean;
    suggestedAddresses: SuggestedAddress[];
    verifiedAddresses: VerifiedAddress[]
}

const addressAutoCompleteService = new AddressAutoCompleteService();
const verifyAddressService = new VerifyAddressService();

export default class AddressForm extends React.Component<AddressFormProps, AddressFormState> {

    constructor(props: AddressFormProps) {
        super(props);

        this.state = {
            address: props.address,
            sameMailingAddress: props.address.sameMailingAddress,
            sameJanuaryAddress: props.address.sameJanuaryAddress,
            suggestedAddresses: [],
            verifiedAddresses: []
        };
    }

    toggleSameMailingAddress = () => {
        this.setState({
            ...this.state,
            ...{
                sameMailingAddress: !this.state.sameMailingAddress,
                address: {...this.state.address, ...{verified: false}}
            }
        });
    }

    toggleSameJanuaryAddress = () => {
        this.setState({
            ...this.state,
            ...{
                sameJanuaryAddress: !this.state.sameJanuaryAddress,
                address: {...this.state.address, ...{verified: false}}
            },
            
        });
    }

    onLine1Change = (e: any) => {
        this.setState({address: {...this.state.address, ...{verified: false, line1: e.target.value}}}, () => this.getAutoCompleteAddresses());
    }

    onLine2Change = (e: any) => {
        this.setState({address: {...this.state.address, ...{verified: false, line2: e.target.value}}});
    }

    onCityChange = (e: any) => {
        this.setState({address: {...this.state.address, ...{verified: false, city: e.target.value}}});
    }

    onStateChange = (e: any) => {
        this.setState({address: {...this.state.address, ...{verified: false, state: e.target.value}}});
    }

    onZipChange = (e: any) => {
        this.setState({address: {...this.state.address, ...{verified: false, zip: e.target.value}}});
    }

    onAddressSelected = async (address: SuggestedAddress) => {
        this.setState({
            suggestedAddresses: []
        });

        let verfiedAddresses = await verifyAddressService.verifyAddress(address);

        this.setState({verifiedAddresses: verfiedAddresses});

        if(verfiedAddresses.length > 0) {
            let { components, metadata, analysis } = verfiedAddresses[0];
            let { primaryNumber, streetName, streetSuffix, cityName, state, zipCode } = components;
            let { dpvFootnotes } = analysis;
            let { recordType } = metadata;

            primaryNumber = primaryNumber ? primaryNumber : '';
            streetName = streetName ? streetName : '';
            streetSuffix = streetSuffix ? streetSuffix : '';
            zipCode = zipCode ? zipCode : '';

            this.setState({address: 
                {
                    ...this.state.address,
                    ...{
                        line1: recordType === "P" ? `${streetName} ${primaryNumber}` : `${primaryNumber} ${streetName} ${streetSuffix}`,
                        city: cityName,
                        state: state,
                        zip: zipCode,
                        verified: dpvFootnotes === "AABB" && !(this.state.sameMailingAddress && recordType === "P")
                    }
                }
            });
        }
    }

    getAutoCompleteAddresses = async () => {
        let line1 = this.state.address.line1;
        let response  = await addressAutoCompleteService.getSuggestedAddresses(line1);
        this.setState({suggestedAddresses: response.result});
    }

    verifiyAddress = async () => {
        console.log(`address verfied: ${this.state.address.verified}`);
        if(this.state.address.verified) {
            console.log('submitting form...');
            return;
        }
        console.log('verifying address...');

        let verfiedAddresses = await verifyAddressService.verifyAddress({
            text: this.state.address.line1, 
            streetLine: this.state.address.line1, 
            city: this.state.address.city, 
            state: this.state.address.state
        });

        if(verfiedAddresses.length > 0) {
            let { components, metadata, analysis } = verfiedAddresses[0];
            let { primaryNumber, streetName, streetSuffix, cityName, state, zipCode } = components;
            let { dpvFootnotes } = analysis;
            let { recordType } = metadata;

            primaryNumber = primaryNumber ? primaryNumber : '';
            streetName = streetName ? streetName : '';
            streetSuffix = streetSuffix ? streetSuffix : '';
            zipCode = zipCode ? zipCode : '';

            this.setState({address: 
                {
                    ...this.state.address,
                    ...{
                        line1: recordType === "P" ? `${streetName} ${primaryNumber}` : `${primaryNumber} ${streetName} ${streetSuffix}`,
                        city: cityName,
                        state: state,
                        zip: zipCode,
                        verified: dpvFootnotes === "AABB" && !(this.state.sameMailingAddress && recordType === "P")
                    }
                }
            });
        }
    }

    render() { 
        return (
            <div className="container">
                <form>
                    <div>
                        <label >Line 1</label>
                        <input type="text" onChange={this.onLine1Change} value={this.state.address.line1} />
                        <AddressAutoCompleteList suggestedAddresses={this.state.suggestedAddresses} addressSelected={this.onAddressSelected} />
                    </div>
                    <div>
                        <label >Line 2</label>
                        <input type="text" onChange={this.onLine2Change} value={this.state.address.line2} />
                    </div>
                    <div>
                        <label >City</label>
                        <input type="text" onChange={this.onCityChange} value={this.state.address.city} />
                    </div>
                    <div>
                        <label >State</label>
                        <input type="text" onChange={this.onStateChange} value={this.state.address.state} />
                    </div>
                    <div>
                        <label >Zip</label>
                        <input type="text" onChange={this.onZipChange} value={this.state.address.zip} />
                    </div>
                    
                    <Checkbox show={this.props.enableSameMailingAddress} checked={this.state.sameMailingAddress} onClick={this.toggleSameMailingAddress} label="This is also my mailing address" />
                    <Checkbox show={this.props.enableSameJanuaryAddress} checked={this.state.sameJanuaryAddress} onClick={this.toggleSameJanuaryAddress} label="This is the physical address of the place I lived on January 1st of this year" />

                    <div>
                        <button type="button" onClick={this.verifiyAddress}>Next</button> <VerifiedIndicator verified={this.state.address.verified} />
                    </div>
                </form>
                <br />

                <pre>
                    <strong>State:</strong>
                    {JSON.stringify(this.state, null, 2)}
                </pre>

                <pre>
                <strong>Properties:</strong>
                {JSON.stringify(this.props, null, 2)}
                </pre>
            </div>
        );
    }
}