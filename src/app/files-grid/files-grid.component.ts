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

  @Input() highlight = '';

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

  sourceTypeLabel(type: string | null | undefined): string {
    const labels: Record<string, string> = {
      LOCAL_FOLDER: 'This computer',
      SHARED_DRIVE: 'Shared drive',
      NETWORK_SHARE: 'Network share',
      ARCHIVE: 'Archive',
    };
    return type ? labels[type] || type : 'Document source';
  }

  ownershipLabel(basis: string | null | undefined): string {
    const labels: Record<string, string> = {
      SOURCE_PROFILE: 'Assigned by source',
      DOCUMENT_METADATA: 'From document metadata',
      FILESYSTEM_OWNER: 'From filesystem owner',
    };
    return basis ? labels[basis] || basis : 'Document owner';
  }

  highlightSegments(value: string | null | undefined): HighlightSegment[] {
    if (!value) return [];
    const terms = this.highlight.trim().split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean)
      .sort((left, right) => right.length - left.length);
    if (!terms.length) return [{ text: value, match: false }];
    const expression = new RegExp(`(${terms.map(this.escapeExpression).join('|')})`, 'gi');
    return value.split(expression)
      .filter((text) => text.length > 0)
      .map((text) => ({ text, match: terms.some((term) => text.toLowerCase() === term.toLowerCase()) }));
  }

  private escapeExpression(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

interface HighlightSegment {
  text: string;
  match: boolean;
}
