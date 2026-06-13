import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { DocumentPreview, FileService } from '../file.service';
import { SearchFile } from '../search-file';

@Component({
  selector: 'app-file-preview',
  imports: [A11yModule, MatIconModule],
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css'],
})
export class FilePreviewComponent implements OnInit, OnDestroy {
  private fileService = inject(FileService);

  private sanitizer = inject(DomSanitizer);

  private returnFocus = document.activeElement as HTMLElement | null;

  @Input({ required: true }) file!: SearchFile;

  @Output() closed = new EventEmitter<void>();

  preview?: DocumentPreview;

  loading = true;

  failed = false;

  activeView: 'visual' | 'text' = 'text';

  safeContentUrl?: SafeResourceUrl;

  imageUrl = '';

  ngOnInit(): void {
    if (!this.file.id) {
      this.loading = false;
      this.failed = true;
      return;
    }

    this.imageUrl = this.fileService.previewContentUrl(this.file.id);
    this.safeContentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
    this.fileService.getPreview(this.file.id).subscribe((preview) => {
      this.preview = preview;
      this.failed = !preview;
      this.loading = false;
      this.activeView = preview?.originalAvailable ? 'visual' : 'text';
    });
  }

  ngOnDestroy(): void {
    this.returnFocus?.focus();
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.closed.emit();
  }

  showVisual(): boolean {
    return this.preview?.originalAvailable === true;
  }

  showText(): boolean {
    return Boolean(this.preview?.text);
  }

  typeLabel(): string {
    if (this.preview?.previewType === 'PDF') return 'PDF preview';
    if (this.preview?.previewType === 'IMAGE') return 'Image preview';
    if (this.showText()) return 'Extracted text preview';
    return 'Document preview';
  }
}
