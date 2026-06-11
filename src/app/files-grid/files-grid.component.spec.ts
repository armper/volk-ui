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
        sourceName: 'Finance records',
        sourceType: 'SHARED_DRIVE',
        contentOwner: 'Controller team',
        ownershipBasis: 'SOURCE_PROFILE',
        department: 'Finance',
        relativePath: 'annual/test.docx',
      },
    ];

    fixture.componentRef.setInput('files', files);
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent;
    expect(text).toContain('test.docx');
    expect(text).toContain('Volk Test Document');
    expect(text).toContain('Armando Perea');
    expect(text).toContain('Finance records');
    expect(text).toContain('Controller team');
    expect(text).toContain('Finance');
    expect(text).toContain('annual/test.docx');
    expect(text).toContain('2 KB');
  });
});
