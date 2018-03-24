import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class UserServiceService {

  private searchUsersUrl = 'http://localhost:8091/searchuser/';

  constructor(
    private http: HttpClient
  ) {}

  searchUsers(term: string): Observable<User[]> {
    console.log(`searching ` + term);
    return this.http.get<User[]>(this.searchUsersUrl, {
      params: {
        name: term
      }
    })
      .pipe(
        tap(users => users.forEach(u => console.log(`fetched user: ` + u.name))),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUser(id: string): Observable<User> {
    console.log(`searching ` + id);

    return this.http.get<User>(`${this.searchUsersUrl}${id}`)
      .pipe(
        tap(_ => console.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
