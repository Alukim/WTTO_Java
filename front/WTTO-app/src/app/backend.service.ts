import { AddressModel } from './models/addressModel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from './models/document';
import { Address } from './models/address';
import { CreateDocument } from './models/createDocument';
import { UpdateDocumentDetails } from './models/UpdateDocumentDetails';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private apiUrl = 'http://localhost:8081/api/documents';

  constructor(private http: HttpClient) { }

  getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>(this.apiUrl);
  }

  removeDocument(documentId: number): Observable<any> {
    return this.http.delete<Document>(`${this.apiUrl}/${documentId}`);
  }

  getDocument(documentId: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${documentId}`);
  }

  createDocument(createDocument: CreateDocument): Observable<any> {
    return this.http.post(this.apiUrl, createDocument);
  }

  updateDocumentDetails(documentId: number, updateDocumentDetails: UpdateDocumentDetails): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${documentId}/details`, updateDocumentDetails);
  }

  getDocumentAddresses(documentId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/${documentId}/addresses`);
  }

  addDocumentAddress(documentId: number, model: AddressModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/${documentId}/addresses`, model);
  }

  updateDocumentAddress(documentId: number, addressId: number, model: AddressModel): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${documentId}/addresses/${addressId}`, model);
  }

  removeDocumentAddress(documentId: number, addressId: number): Observable<any> {
    return this.http.delete<Document>(`${this.apiUrl}/${documentId}/addresses/${addressId}`);
  }
}
