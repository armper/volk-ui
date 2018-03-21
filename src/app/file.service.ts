import { User } from './user';
import { SearchFile } from './search-file';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileService {

  private searchFilesUrl = 'http://localhost:8091/searchfile/';

  constructor(
    private http: HttpClient
  ) { }

  searchFiles(userId: string): Observable<SearchFile[]> {
    console.log(`searching files for user: ` + userId);
    return this.http.get<SearchFile[]>(this.searchFilesUrl, {
      params: {
        userid: userId
      }
    });
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
