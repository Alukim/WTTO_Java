import { TestBed } from '@angular/core/testing';

import { DocumentsDataSourceService } from './documents-data-source.service';

describe('DocumentsDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentsDataSourceService = TestBed.get(DocumentsDataSourceService);
    expect(service).toBeTruthy();
  });
});
