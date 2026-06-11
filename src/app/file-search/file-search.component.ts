import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SearchFile } from '../search-file';
import { FileService } from '../file.service';
import { FilesGridComponent } from '../files-grid/files-grid.component';

/**
 * Full-text search across file names, titles, and extracted document content.
 */
@Component({
  selector: 'app-file-search',
  imports: [FormsModule, RouterLink, MatIconModule, FilesGridComponent],
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.css'],
})
export class FileSearchComponent {
  private fileService = inject(FileService);

  query = '';

  files: SearchFile[] = [];

  searched = false;

  private searchTerms = new Subject<string>();

  constructor() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.fileService.searchContent(term))
      )
      .subscribe((files) => {
        this.files = files;
        this.searched = true;
      });
  }

  search(term: string): void {
    const cleanTerm = term.trim();
    if (cleanTerm) {
      this.searchTerms.next(cleanTerm);
    } else {
      this.files = [];
      this.searched = false;
    }
  }

  clearSearch(): void {
    this.query = '';
    this.files = [];
    this.searched = false;
  }
}
