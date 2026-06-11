import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { User } from './user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('searches users by name', () => {
    const users: User[] = [{ id: '1', name: 'alperea', domainName: '' }];

    service.searchUsers('alp').subscribe((result) => expect(result).toEqual(users));

    const req = httpMock.expectOne((r) => r.url === 'http://localhost:8091/searchuser/');
    expect(req.request.params.get('name')).toBe('alp');
    req.flush(users);
  });

  it('returns an empty list when the search fails', () => {
    service.searchUsers('alp').subscribe((result) => expect(result).toEqual([]));

    const req = httpMock.expectOne((r) => r.url === 'http://localhost:8091/searchuser/');
    req.flush('boom', { status: 500, statusText: 'Server Error' });
  });
});
