import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SearchFile } from './search-file';

export interface DocumentSearchFilters {
  extension?: string;
  owner?: string;
  sourceId?: string;
  folder?: string;
  modifiedFrom?: string;
  modifiedTo?: string;
  minSize?: number;
  maxSize?: number;
  author?: string;
  keywords?: string;
  sort?: string;
}

export interface SearchSourceOption {
  id: string;
  name: string;
  type: string;
}

export interface DocumentSearchOptions {
  extensions: string[];
  owners: string[];
  authors: string[];
  sources: SearchSourceOption[];
  maxSize: number;
}

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

  /** Permission-aware text search, filtering, and sorting. */
  searchContent(query: string, filters: DocumentSearchFilters = {}): Observable<SearchFile[]> {
    let params = new HttpParams().set('q', query);
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, String(value));
      }
    });
    return this.http
      .get<SearchFile[]>(`${this.searchFilesUrl}search`, { params })
      .pipe(catchError(this.handleError<SearchFile[]>(`searchContent q=${query}`, [])));
  }

  searchOptions(): Observable<DocumentSearchOptions> {
    return this.http
      .get<DocumentSearchOptions>(`${this.searchFilesUrl}search/options`)
      .pipe(catchError(this.handleError<DocumentSearchOptions>('searchOptions', {
        extensions: [], owners: [], authors: [], sources: [], maxSize: 0,
      })));
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
