import { BackendService } from './../backend.service';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CreateDocument } from '../models/createDocument';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-document',
  templateUrl: './new-document.component.html',
  styleUrls: ['./new-document.component.css']
})
export class NewDocumentComponent implements OnInit {

  createForm: FormGroup;

  firstNameForm = new FormControl('', [Validators.required]);
  lastNameForm = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private backendService: BackendService, private router: Router) {
    this.createForm =  fb.group({
      firstNameForm: this.firstNameForm,
      lastNameForm: this.lastNameForm
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    console.log(`form: firstName: ${this.firstNameForm.value} lastName: ${this.lastNameForm.value}`);
    this.backendService.createDocument(new CreateDocument(this.firstNameForm.value, this.lastNameForm.value))
      .subscribe(() => this.router.navigate(['/home']));
  }

  getFirstNameErrorMessage() {
    return this.firstNameForm.hasError('required') ? 'You must enter a value' : '';
  }

  getLastNameNameErrorMessage() {
    return this.lastNameForm.hasError('required') ? 'You must enter a value' : '';
  }
}
