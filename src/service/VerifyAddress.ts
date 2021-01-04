import SmartyStreetsSDK from 'smartystreets-javascript-sdk';
import { SuggestedAddress } from "./AddressAutoComplete";
const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usStreet.Lookup;
const websiteKey = "5264416744258484";
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);
const client = SmartyStreetsCore.buildClient.usStreet(credentials);

export enum AddressStatus {
    ServiceUnavailable = 1,
    Invalid = 2,
    NotAMailingAddress = 3,
    VerifiedExactMatch = 4,
    VerifiedWithChanges = 5

}
export interface VerifiedAddress {
    text: string, 
    streetLine: string, 
    city: string, 
    state: string
    components: any
}

export interface VerifyAddress {
    verifyAddress(address: SuggestedAddress): Promise<VerifiedAddress>;
}

export class VerifyAddressService implements VerifyAddress {

    async verifyAddress(address: SuggestedAddress) {
        let lookup = new Lookup();
        lookup.street = address.streetLine;
        lookup.city = address.city;
        lookup.state = address.state;
        lookup.match = "invalid";

        return await client.send(lookup).then(response => {
            let verfiedAddresses: VerifiedAddress[] = response.lookups[0].result;
            
            console.log(`${verfiedAddresses.length} verfied addresses found!`);
            console.log(JSON.stringify(verfiedAddresses));
            return verfiedAddresses;
        });
    }
}