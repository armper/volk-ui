import { TestBed } from '@angular/core/testing';

import { FilesGridComponent } from './files-grid.component';
import { User } from '../user';

describe('FilesGridComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesGridComponent],
    }).compileComponents();
  });

  it('shows the files of the bound user', () => {
    const fixture = TestBed.createComponent(FilesGridComponent);
    const user: User = {
      id: '1',
      name: 'alperea',
      domainName: '',
      searchFiles: [
        {
          id: null,
          size: 10,
          createdDateTime: '2026-06-11T10:00:00',
          lastModified: '2026-06-11T10:00:00',
          fileName: 'test.docx',
          path: '/tmp/test.docx',
          extension: 'docx',
          server: '/tmp',
          share: null,
        },
      ],
    };

    fixture.componentRef.setInput('user', user);
    fixture.detectChanges();

    expect(fixture.componentInstance.files.length).toBe(1);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('test.docx');
  });
});
