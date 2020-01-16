export default interface Address {
    line1: string; 
    line2: string; 
    city: string; 
    state: string; 
    zip: string;
    verified: boolean;
    sameMailingAddress: boolean;
    sameJanuaryAddress: boolean;
}