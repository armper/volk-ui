import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);

  private searchUsersUrl = 'http://localhost:8091/searchuser/';

  searchUsers(term: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.searchUsersUrl, { params: { name: term } })
      .pipe(
        tap((users) => console.log(`found ${users.length} users for "${term}"`)),
        catchError(this.handleError<User[]>('searchUsers', []))
      );
  }

  getUser(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.searchUsersUrl}${id}`).pipe(
      tap(() => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User | undefined>(`getUser id=${id}`))
    );
  }

  /**
   * Handle a failed Http operation and let the app continue.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed`, error);
      return of(result as T);
    };
  }
}
