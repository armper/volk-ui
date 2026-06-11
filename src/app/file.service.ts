import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchFile } from './search-file';

@Injectable({ providedIn: 'root' })
export class FileService {
  private http = inject(HttpClient);

  private searchFilesUrl = 'http://localhost:8091/searchfile/';

  /** Files attributed to a user. */
  searchFiles(userId: string): Observable<SearchFile[]> {
    return this.http
      .get<SearchFile[]>(this.searchFilesUrl, { params: { userid: userId } })
      .pipe(catchError(this.handleError<SearchFile[]>(`searchFiles userId=${userId}`, [])));
  }

  /** Full-text search over file names, titles, and extracted content. */
  searchContent(query: string): Observable<SearchFile[]> {
    return this.http
      .get<SearchFile[]>(`${this.searchFilesUrl}search`, { params: { q: query } })
      .pipe(catchError(this.handleError<SearchFile[]>(`searchContent q=${query}`, [])));
  }

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
