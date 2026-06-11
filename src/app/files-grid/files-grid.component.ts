import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { SearchFile } from '../search-file';

@Component({
  selector: 'app-files-grid',
  imports: [DatePipe, MatIconModule],
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css'],
})
export class FilesGridComponent {
  @Input() files: SearchFile[] = [];

  fileIcon(extension: string): string {
    const type = extension.toLowerCase();
    if (['doc', 'docx', 'docm', 'txt'].includes(type)) return 'article';
    if (['xls', 'xlsx', 'xlsm', 'csv'].includes(type)) return 'table_chart';
    if (['ppt', 'pptx', 'pptm'].includes(type)) return 'slideshow';
    if (type === 'pdf') return 'picture_as_pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bmp'].includes(type)) return 'image';
    if (['mp4', 'webm', 'avi', 'mov'].includes(type)) return 'movie';
    return 'draft';
  }

  fileSize(size: number | null): string {
    if (size === null || size === undefined) return 'Size unavailable';
    if (size < 1024) return `${size} B`;
    const kilobytes = size / 1024;
    if (kilobytes < 1024) return `${Number(kilobytes.toFixed(kilobytes >= 10 ? 0 : 1))} KB`;
    const megabytes = kilobytes / 1024;
    return `${Number(megabytes.toFixed(megabytes >= 10 ? 0 : 1))} MB`;
  }

  accessLabel(file: SearchFile): string {
    if (file.othersReadable) return 'Shared';
    if (file.groupReadable || (file.allowedPrincipals?.length ?? 0) > 0) return 'Team access';
    return 'Private';
  }

  accessIcon(file: SearchFile): string {
    if (file.othersReadable) return 'public';
    if (file.groupReadable || (file.allowedPrincipals?.length ?? 0) > 0) return 'group';
    return 'lock';
  }
}
