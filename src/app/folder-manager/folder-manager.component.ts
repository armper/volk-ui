import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { DirectoryListing, FolderService, WatchFolder } from '../folder.service';

@Component({
  selector: 'app-folder-manager',
  imports: [FormsModule, MatIconModule],
  templateUrl: './folder-manager.component.html',
  styleUrls: ['./folder-manager.component.css'],
})
export class FolderManagerComponent implements OnInit {
  private folderService = inject(FolderService);

  watchedFolders: WatchFolder[] = [];

  listing?: DirectoryListing;

  pathInput = '';

  recursive = true;

  sourceName = '';

  sourceType = 'LOCAL_FOLDER';

  department = '';

  sourceOwner = '';

  readonly sourceTypes = [
    { value: 'LOCAL_FOLDER', label: 'Folder on this computer' },
    { value: 'SHARED_DRIVE', label: 'Shared drive' },
    { value: 'NETWORK_SHARE', label: 'Network share' },
    { value: 'ARCHIVE', label: 'Archive or records store' },
  ];

  loadingFolders = true;

  browsing = true;

  saving = false;

  error = '';

  message = '';

  ngOnInit(): void {
    this.loadFolders();
    this.browse();
  }

  loadFolders(): void {
    this.loadingFolders = true;
    this.folderService.list().subscribe({
      next: (folders) => {
        this.watchedFolders = folders;
        if (this.listing) this.syncSourceProfile(this.listing.path);
        this.loadingFolders = false;
      },
      error: (error) => {
        this.error = this.errorMessage(error, 'The sniffer is not available right now.');
        this.loadingFolders = false;
      },
    });
  }

  browse(path?: string): void {
    this.browsing = true;
    this.error = '';
    this.folderService.browse(path).subscribe({
      next: (listing) => {
        this.listing = listing;
        this.pathInput = listing.path;
        this.syncSourceProfile(listing.path);
        this.browsing = false;
      },
      error: (error) => {
        this.error = this.errorMessage(error, 'Volk could not open that folder.');
        this.browsing = false;
      },
    });
  }

  browseTypedPath(): void {
    this.browse(this.pathInput.trim());
  }

  addCurrentFolder(): void {
    if (!this.listing || this.saving) return;

    this.saving = true;
    this.error = '';
    this.message = '';
    this.folderService.add(this.listing.path, this.recursive, {
      sourceName: this.sourceName.trim(),
      sourceType: this.sourceType,
      department: this.department.trim(),
      sourceOwner: this.sourceOwner.trim(),
    }).subscribe({
      next: (folder) => {
        this.message = `${folder.sourceName} is now tracked as a document source.`;
        this.saving = false;
        this.loadFolders();
      },
      error: (error) => {
        this.error = this.errorMessage(error, 'Volk could not watch that folder.');
        this.saving = false;
      },
    });
  }

  removeFolder(folder: WatchFolder): void {
    this.error = '';
    this.message = '';
    this.folderService.remove(folder.path).subscribe({
      next: () => {
        this.message = `Stopped watching ${folder.path}`;
        this.loadFolders();
      },
      error: (error) => {
        this.error = this.errorMessage(error, 'Volk could not stop watching that folder.');
      },
    });
  }

  isWatching(path: string): boolean {
    return this.watchedFolders.some((folder) => folder.path === path);
  }

  folderName(path: string): string {
    const parts = path.split('/').filter(Boolean);
    return parts.at(-1) || path;
  }

  sourceTypeLabel(type: string): string {
    return this.sourceTypes.find((sourceType) => sourceType.value === type)?.label || type;
  }

  private syncSourceProfile(path: string): void {
    const existing = this.watchedFolders.find((folder) => folder.path === path);
    this.sourceName = existing?.sourceName || this.folderName(path);
    this.sourceType = existing?.sourceType || (path.startsWith('/Volumes/') ? 'SHARED_DRIVE' : 'LOCAL_FOLDER');
    this.department = existing?.department || '';
    this.sourceOwner = existing?.sourceOwner || '';
    this.recursive = existing?.recursive ?? true;
  }

  private errorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.detail || error.error?.message || fallback;
    }
    return fallback;
  }
}
