import { FileService } from './../file.service';
import { SearchFile } from './../search-file';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css']
})
export class FilesGridComponent implements OnChanges {
  @Input() user: User;

  files: SearchFile[] = new Array<SearchFile>();

  private displayedColumns = ['path', 'fileName'];

  constructor(private fileService: FileService
  ) { }

  ngOnChanges(changes: SimpleChanges) {

    if (this.user != null) {
      this.files = this.user.searchFiles;
    }
  }
}
