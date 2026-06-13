import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { SearchFile } from '../search-file';
import { DocumentSearchFilters, DocumentSearchOptions, FileService } from '../file.service';
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
export class FileSearchComponent implements OnInit {
  private fileService = inject(FileService);

  query = '';

  files: SearchFile[] = [];

  searched = false;

  loading = false;

  moreFilters = false;

  extension = '';

  owner = '';

  sourceId = '';

  folder = '';

  modifiedFrom = '';

  modifiedTo = '';

  author = '';

  keywords = '';

  sizeRange = '';

  sort = 'relevance';

  options: DocumentSearchOptions = {
    extensions: [], owners: [], authors: [], sources: [], maxSize: 0,
  };

  private searchTerms = new Subject<SearchState>();

  constructor() {
    this.searchTerms
      .pipe(
        debounceTime(300),
        switchMap((state) => this.fileService.searchContent(state.query, state.filters))
      )
      .subscribe((files) => {
        this.files = files;
        this.searched = true;
        this.loading = false;
      });
  }

  ngOnInit(): void {
    this.fileService.searchOptions().subscribe((options) => {
      this.options = options;
    });
  }

  search(term: string): void {
    this.query = term;
    this.queueSearch(false);
  }

  applyFilters(): void {
    this.queueSearch(this.searched);
  }

  submitSearch(): void {
    this.queueSearch(true);
  }

  clearSearch(): void {
    this.query = '';
    this.queueSearch(false);
  }

  clearAll(): void {
    this.query = '';
    this.extension = '';
    this.owner = '';
    this.sourceId = '';
    this.folder = '';
    this.modifiedFrom = '';
    this.modifiedTo = '';
    this.author = '';
    this.keywords = '';
    this.sizeRange = '';
    this.sort = 'relevance';
    this.files = [];
    this.searched = false;
    this.loading = false;
  }

  activeFilterCount(): number {
    return [this.extension, this.owner, this.sourceId, this.folder, this.modifiedFrom, this.modifiedTo,
      this.author, this.keywords, this.sizeRange].filter(Boolean).length;
  }

  sourceTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      LOCAL_FOLDER: 'This computer', SHARED_DRIVE: 'Shared drive',
      NETWORK_SHARE: 'Network share', ARCHIVE: 'Archive',
    };
    return labels[type] || type;
  }

  private queueSearch(force: boolean): void {
    const filters = this.buildFilters();
    const hasCriteria = this.query.trim() || this.activeFilterCount() > 0;
    if (!force && !hasCriteria) {
      this.files = [];
      this.searched = false;
      this.loading = false;
      return;
    }
    this.loading = true;
    this.searchTerms.next({ query: this.query.trim(), filters });
  }

  private buildFilters(): DocumentSearchFilters {
    const filters: DocumentSearchFilters = {
      extension: this.extension,
      owner: this.owner,
      sourceId: this.sourceId,
      folder: this.folder.trim(),
      modifiedFrom: this.modifiedFrom,
      modifiedTo: this.modifiedTo,
      author: this.author.trim(),
      keywords: this.keywords.trim(),
      sort: this.sort,
    };
    if (this.sizeRange) {
      const [minimum, maximum] = this.sizeRange.split('-');
      filters.minSize = minimum ? Number(minimum) : undefined;
      filters.maxSize = maximum ? Number(maximum) : undefined;
    }
    return filters;
  }
}

interface SearchState {
  query: string;
  filters: DocumentSearchFilters;
}
