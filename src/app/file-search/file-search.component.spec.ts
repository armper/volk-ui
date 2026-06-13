import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { FileSearchComponent } from './file-search.component';

describe('FileSearchComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileSearchComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('debounces and queries the search endpoint', fakeAsync(() => {
    const fixture = TestBed.createComponent(FileSearchComponent);
    fixture.detectChanges();

    const optionsRequest = httpMock.expectOne('http://localhost:8091/searchfile/search/options');
    optionsRequest.flush({ extensions: ['pdf'], owners: [], authors: [], sources: [], maxSize: 0 });

    fixture.componentInstance.search('lighthouse');
    tick(300);

    const req = httpMock.expectOne((r) => r.url === 'http://localhost:8091/searchfile/search');
    expect(req.request.params.get('q')).toBe('lighthouse');
    expect(req.request.params.get('sort')).toBe('relevance');
    req.flush([]);

    expect(fixture.componentInstance.searched).toBeTrue();
  }));

  it('searches with filters even when the keyword is blank', fakeAsync(() => {
    const fixture = TestBed.createComponent(FileSearchComponent);
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:8091/searchfile/search/options').flush({
      extensions: ['pdf'], owners: ['Records team'], authors: [], sources: [], maxSize: 0,
    });

    fixture.componentInstance.extension = 'pdf';
    fixture.componentInstance.owner = 'Records team';
    fixture.componentInstance.applyFilters();
    tick(300);

    const request = httpMock.expectOne((candidate) => candidate.url === 'http://localhost:8091/searchfile/search');
    expect(request.request.params.get('q')).toBe('');
    expect(request.request.params.get('extension')).toBe('pdf');
    expect(request.request.params.get('owner')).toBe('Records team');
    request.flush([]);
  }));
});
