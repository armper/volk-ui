import { FileService } from './../file.service';
import { SearchFile } from './../search-file';
import { FilesGridComponent } from './../files-grid/files-grid.component';
import { UserServiceService } from './../user-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import mongoose from 'mongoose';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {
  user: User;
  files: SearchFile[];
  displayedColumns = ['path', 'fileName'];
  dataSource = this.files;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
        this.fileService.searchFiles(user.id)
          .subscribe(files => {
            this.files = files;
            console.log(files.length);
          });
      });
  }
}
