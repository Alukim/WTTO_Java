import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BackendService } from '../backend.service';
import { Document } from './../models/document';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections/index';

@Injectable({
  providedIn: 'root'
})
export class DocumentsDataSourceService implements DataSource<Document> {

  private documentsSubject = new BehaviorSubject<Document[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private backendService: BackendService) { }

  getDocuments() {

    this.loadingSubject.next(true);

    this.backendService.getDocuments()
    .pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(documents => this.documentsSubject.next(documents));
  }

  connect(collectionViewer: CollectionViewer): Observable<Document[]> {
    console.log('Connecting Documents data source');
    return this.documentsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting Documents data source');
    this.documentsSubject.complete();
    this.loadingSubject.complete();
  }
}
