import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateAddressDialogModel } from '../models/updateAddressDialogModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AddressModel } from '../models/addressModel';
import { BackendService } from '../backend.service';

@Component({
    selector: 'app-update-address',
    templateUrl: './update-address.component.html',
    styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {

    addressForm: FormGroup;
    addressLine = new FormControl('', [Validators.required, Validators.maxLength(40)]);
    city = new FormControl('', [Validators.required, Validators.maxLength(40)]);
    postCode = new FormControl('', [Validators.required, Validators.maxLength(40)]);

    detailsChanged: boolean;

    constructor(public dialogRef: MatDialogRef<UpdateAddressComponent>, private fb: FormBuilder, private backendService: BackendService,
                @Inject(MAT_DIALOG_DATA) public data: UpdateAddressDialogModel, private snackBar: MatSnackBar) {
        this.addressForm = this.fb.group({
            addressLine: this.addressLine,
            city: this.city,
            postCode: this.postCode
        });

        this.detailsChanged = false;

        this.addressLine.setValue(this.data.addressLine);
        this.city.setValue(this.data.city);
        this.postCode.setValue(this.data.postCode);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onInputChange(): void {
        this.updateDetailsChanged();
    }

    updateDetailsChanged(): void {
        this.detailsChanged = this.addressForm.valid && this.isDetailsChanged();
    }

    onAddressSubmit(): void {
        if (this.isDetailsChanged()) {
            this.backendService.updateDocumentAddress(this.data.documentId, this.data.addressId,
                new AddressModel(this.addressLine.value, this.city.value, this.postCode.value))
                .subscribe(() => {
                    this.snackBar.open('Address updated', 'Close', {
                        duration: 2000,
                    });
                    this.dialogRef.close();
                });
        }
    }

    getAddressLineErrorMessage() {
        return this.addressLine.hasError('required') ? 'You must enter a value' : '';
    }

    getCityNameErrorMessage() {
        return this.city.hasError('required') ? 'You must enter a value' : '';
    }

    getPostCodeNameErrorMessage() {
        return this.postCode.hasError('required') ? 'You must enter a value' : '';
    }

    isDetailsChanged(): boolean {
        return this.data.addressLine !== this.addressLine.value || this.data.city !== this.city.value ||
            this.data.postCode !== this.postCode.value;
    }
}
