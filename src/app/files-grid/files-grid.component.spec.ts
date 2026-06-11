import { TestBed } from '@angular/core/testing';

import { FilesGridComponent } from './files-grid.component';
import { SearchFile } from '../search-file';

describe('FilesGridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesGridComponent],
    }).compileComponents();
  });

  it('shows the bound files with their metadata', () => {
    const fixture = TestBed.createComponent(FilesGridComponent);
    const files: SearchFile[] = [
      {
        id: '1',
        userId: 'u1',
        size: 2048,
        createdDateTime: '2026-06-11T10:00:00',
        lastModified: '2026-06-11T10:00:00',
        fileName: 'test.docx',
        path: '/tmp/test.docx',
        extension: 'docx',
        server: '/tmp',
        share: null,
        title: 'Volk Test Document',
        author: 'Armando Perea',
        keywords: null,
        comments: null,
        contentType: null,
      },
    ];

    fixture.componentRef.setInput('files', files);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('test.docx');
    expect(text).toContain('Volk Test Document');
    expect(text).toContain('Armando Perea');
    expect(text).toContain('2 KB');
  });
});
