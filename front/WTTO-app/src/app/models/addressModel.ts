export class AddressModel {
    constructor(addressLine: string, city: string, postCode: string) {
        this.addressLine = addressLine;
        this.city = city;
        this.postCode = postCode;
    }

    addressLine: string;
    city: string;
    postCode: string;
}
