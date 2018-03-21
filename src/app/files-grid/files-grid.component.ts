import { SearchFile } from './../search-file';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.css']
})
export class FilesGridComponent implements OnInit {
  files: SearchFile[];

  constructor() { }

  ngOnInit() {
  }

}
