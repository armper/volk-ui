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
    this.folderService.add(this.listing.path, this.recursive).subscribe({
      next: (folder) => {
        this.message = `Now watching ${folder.path}`;
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

  private errorMessage(error: unknown, fallback: string): string {
    if (error instanceof HttpErrorResponse) {
      return error.error?.detail || error.error?.message || fallback;
    }
    return fallback;
  }
}
