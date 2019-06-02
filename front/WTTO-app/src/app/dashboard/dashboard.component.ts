import { DocumentsDataSourceService } from './../services/documents-data-source.service';
import { BackendService } from './../backend.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  displayedColumns = ['id', 'firstName', 'lastName', 'view/update', 'remove'];
  dataSource: DocumentsDataSourceService;

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
    this.getDocuments();
  }

  onViewClicked(documentId) {
    this.router.navigate([`/document/${documentId}`]);
  }

  onDeletedClicked(documentId) {
    this.backendService.removeDocument(documentId)
      .subscribe(() => {
        this.getDocuments();
      });
  }

  getDocuments(): void {
    this.dataSource = new DocumentsDataSourceService(this.backendService);
    this.dataSource.getDocuments();
  }
}
