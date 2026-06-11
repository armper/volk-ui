import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WatchFolder {
  path: string;
  recursive: boolean;
  sourceId: string;
  sourceName: string;
  sourceType: string;
  department: string;
  sourceOwner: string;
  status: string;
}

export interface SourceProfile {
  sourceName: string;
  sourceType: string;
  department: string;
  sourceOwner: string;
}

export interface DirectoryEntry {
  name: string;
  path: string;
}

export interface DirectoryListing {
  path: string;
  parent: string | null;
  home: string;
  directories: DirectoryEntry[];
}

@Injectable({ providedIn: 'root' })
export class FolderService {
  private http = inject(HttpClient);

  private foldersUrl = 'http://localhost:8092/api/watch-folders';

  list(): Observable<WatchFolder[]> {
    return this.http.get<WatchFolder[]>(this.foldersUrl);
  }

  browse(path?: string): Observable<DirectoryListing> {
    const options = path ? { params: new HttpParams().set('path', path) } : {};
    return this.http.get<DirectoryListing>(`${this.foldersUrl}/browse`, options);
  }

  add(path: string, recursive: boolean, profile: SourceProfile): Observable<WatchFolder> {
    return this.http.post<WatchFolder>(this.foldersUrl, { path, recursive, ...profile });
  }

  remove(path: string): Observable<void> {
    return this.http.delete<void>(this.foldersUrl, { params: { path } });
  }
}
