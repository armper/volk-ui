import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { FolderService } from './folder.service';

describe('FolderService', () => {
  let service: FolderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(FolderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('adds a watched folder with the recursive choice', () => {
    service.add('/tmp/docs', true).subscribe();

    const request = httpMock.expectOne('http://localhost:8092/api/watch-folders');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ path: '/tmp/docs', recursive: true });
    request.flush({ path: '/tmp/docs', recursive: true, status: 'Started' });
  });
});
