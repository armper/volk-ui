import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FilePreviewComponent } from './file-preview.component';
import { DocumentPreview, FileService } from '../file.service';
import { SearchFile } from '../search-file';

describe('FilePreviewComponent', () => {
  let fixture: ComponentFixture<FilePreviewComponent>;

  const file: SearchFile = {
    id: 'document-1',
    userId: null,
    size: 1200,
    createdDateTime: '2026-06-12T10:00:00',
    lastModified: '2026-06-12T10:00:00',
    fileName: 'handbook.docx',
    path: '/tmp/handbook.docx',
    extension: 'docx',
    server: '/tmp',
    share: null,
    title: 'Employee handbook',
    author: null,
    keywords: null,
    comments: null,
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    sourceName: 'Documents',
  };

  const preview: DocumentPreview = {
    id: 'document-1',
    fileName: 'handbook.docx',
    title: 'Employee handbook',
    extension: 'docx',
    contentType: file.contentType,
    previewType: 'TEXT',
    text: 'Welcome to the employee handbook.',
    textTruncated: false,
    originalAvailable: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilePreviewComponent],
      providers: [
        {
          provide: FileService,
          useValue: {
            getPreview: () => of(preview),
            previewContentUrl: (id: string) => `http://localhost:8091/searchfile/${id}/content`,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilePreviewComponent);
    fixture.componentRef.setInput('file', file);
    fixture.detectChanges();
  });

  it('shows extracted text for Office documents', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.textContent).toContain('Extracted text preview');
    expect(element.textContent).toContain('Welcome to the employee handbook.');
    expect(element.textContent).toContain('Permission checked');
  });

  it('closes when the close button is used', () => {
    spyOn(fixture.componentInstance.closed, 'emit');
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.preview-close')?.click();
    expect(fixture.componentInstance.closed.emit).toHaveBeenCalled();
  });
});
