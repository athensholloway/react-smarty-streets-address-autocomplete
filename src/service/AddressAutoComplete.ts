import SmartyStreetsSDK from 'smartystreets-javascript-sdk';

const SmartyStreetsCore = SmartyStreetsSDK.core;
const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;
const websiteKey = "5264416744258484";
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey);
const client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

export interface SuggestedAddress {
    text: string, 
    streetLine: string, 
    city: string, 
    state: string
}

export interface AddressAutocomplete {
    getSuggestedAddresses(address: string): Promise<SuggestedAddress[]>;
}

export class AddressAutoCompleteService implements AddressAutocomplete {

    async getSuggestedAddresses(address: string) {
        let lookup = new Lookup(address);

        return await client.send(lookup);
    }
}