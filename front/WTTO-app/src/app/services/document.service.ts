import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Address } from '../models/address';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { BackendService } from '../backend.service';
import { catchError } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';

@Injectable({
  providedIn: 'root'
})
export class DocumentService implements DataSource<Address> {

  private addressessSubject = new BehaviorSubject<Address[]>([]);

  constructor(private backendService: BackendService) { }

  getDocumentAddresses(documentId: number) {
    this.backendService.getDocumentAddresses(documentId)
    .pipe(
      catchError(() => of([]))
    )
      .subscribe(addresses => this.addressessSubject.next(addresses));
  }

  connect(collectionViewer: CollectionViewer): Observable<Address[]> {
    console.log('Connecting data source');
    return this.addressessSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.addressessSubject.complete();
  }
}
