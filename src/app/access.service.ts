import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AccessSession {
  user: string;
  groups: string[];
  admin: boolean;
  enforcement: string;
}

@Injectable({ providedIn: 'root' })
export class AccessService {
  private http = inject(HttpClient);

  session(): Observable<AccessSession | undefined> {
    return this.http
      .get<AccessSession>('http://localhost:8091/access/session')
      .pipe(catchError(() => of(undefined)));
  }
}
