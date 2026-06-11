import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchFile } from './search-file';

@Injectable({ providedIn: 'root' })
export class FileService {
  private http = inject(HttpClient);

  private searchFilesUrl = 'http://localhost:8091/searchfile/';

  getFile(id: string): Observable<SearchFile | undefined> {
    return this.http.get<SearchFile>(`${this.searchFilesUrl}${id}`).pipe(
      catchError(this.handleError<SearchFile | undefined>(`getFile id=${id}`))
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
