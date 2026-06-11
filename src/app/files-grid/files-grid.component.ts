import { Component, Input, OnChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { SearchFile } from '../search-file';
import { User } from '../user';

@Component({
  selector: 'app-files-grid',
  imports: [MatCardModule, MatTableModule],
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css'],
})
export class FilesGridComponent implements OnChanges {
  @Input() user?: User;

  files: SearchFile[] = [];

  displayedColumns = ['path', 'fileName'];

  ngOnChanges(): void {
    this.files = this.user?.searchFiles ?? [];
  }
}
