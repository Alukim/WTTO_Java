export class UpdateAddressDialogModel {
    constructor(documentId: number, addressId: number, addressLine: string, city: string, postCode: string) {
        this.documentId = documentId;
        this.addressId = addressId;
        this.addressLine = addressLine;
        this.city = city;
        this.postCode = postCode;
    }

    documentId: number;
    addressId: number;
    addressLine: string;
    city: string;
    postCode: string;
}
