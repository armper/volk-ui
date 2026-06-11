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

    fixture.componentInstance.search('lighthouse');
    tick(300);

    const req = httpMock.expectOne((r) => r.url === 'http://localhost:8091/searchfile/search');
    expect(req.request.params.get('q')).toBe('lighthouse');
    req.flush([]);

    expect(fixture.componentInstance.searched).toBeTrue();
  }));
});
