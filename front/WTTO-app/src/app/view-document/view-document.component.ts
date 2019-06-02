import { BackendService } from './../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
import { Document } from './../models/document';
import { FormControl, Validators, FormGroup, FormBuilder, FormGroupDirective } from '@angular/forms';
import { UpdateDocumentDetails } from '../models/UpdateDocumentDetails';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressModel } from '../models/addressModel';
import {MatDialog} from '@angular/material/dialog';
import { UpdateAddressDialogModel } from '../models/updateAddressDialogModel';
import { UpdateAddressComponent } from './UpdateAddressComponent';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {

  documentId: number;
  document: Document;

  displayedColumns = ['id', 'addressLine', 'city', 'postCode', 'update', 'remove'];
  dataSource: DocumentService;

  viewForm: FormGroup;
  addressForm: FormGroup;

  firstName = new FormControl('', [Validators.required, Validators.maxLength(40)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength(40)]);

  addressLine = new FormControl('', [Validators.required, Validators.maxLength(40)]);
  city = new FormControl('', [Validators.required, Validators.maxLength(40)]);
  postCode = new FormControl('', [Validators.required, Validators.maxLength(40)]);

  detailsChanged: boolean;

  constructor(private activatedRoute: ActivatedRoute, private backendService: BackendService, private fb: FormBuilder,
              private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) {
    this.viewForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName
    });
    this.addressForm = this.fb.group({
      addressLine: this.addressLine,
      city: this.city,
      postCode: this.postCode
    });

    this.detailsChanged = false;
    this.documentId = this.activatedRoute.snapshot.params.id;
    this.dataSource = new DocumentService(this.backendService);
  }

  ngOnInit() {
    this.getDocument();
    this.getDocumentAddresses();
  }

  onUpdateDetailsSubmit(): void {
    if (this.isDetailsChanged()) {
      this.backendService.updateDocumentDetails(this.documentId, new UpdateDocumentDetails(this.firstName.value, this.lastName.value))
        .subscribe(() => {
          this.getDocument();
          this.detailsChanged = false;
          this.snackBar.open('Document details updated', 'Close', {
            duration: 2000,
          });
        });
    }
  }

  onAddressSubmit(formDirective: FormGroupDirective): void {
    if (this.addressForm.valid) {
      this.backendService.addDocumentAddress(this.documentId,
        new AddressModel(this.addressLine.value, this.city.value, this.postCode.value))
        .subscribe(() => {
          this.getDocumentAddresses();
          this.addressForm.reset();
          formDirective.resetForm();
          this.snackBar.open('Address added', 'Close', {
            duration: 2000,
          });
        });
    }
  }

  onInputChange(): void {
    this.updateDetailsChanged();
  }

  getDocument(): void {
    this.backendService.getDocument(this.documentId)
    .subscribe(document => {
       this.document = document;
       this.firstName.setValue(document.firstName);
       this.lastName.setValue(document.lastName);
      });
  }

  getDocumentAddresses(): void {
    this.dataSource = new DocumentService(this.backendService);
    this.dataSource.getDocumentAddresses(this.documentId);
  }

  isDetailsChanged(): boolean {
    if (this.document === undefined) {
      return false;
    }

    return this.document.firstName !== this.firstName.value || this.document.lastName !== this.lastName.value;
  }

  updateDetailsChanged(): void {
    this.detailsChanged = this.viewForm.valid && this.isDetailsChanged();
  }

  getFirstNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' : '';
  }

  getLastNameNameErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' : '';
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

  onViewClicked(addressId: number, addressLine, city, postCode) {
    const dialogRef = this.dialog.open(UpdateAddressComponent, {
      width: '750px',
      data: new UpdateAddressDialogModel(this.documentId, addressId, addressLine, city, postCode)
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getDocumentAddresses();
    });
  }

  onDeletedClicked(addressId) {
    this.backendService.removeDocumentAddress(this.documentId, addressId)
      .subscribe(() => {
        this.getDocumentAddresses();
      });
  }
}
