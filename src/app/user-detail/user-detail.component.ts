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

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => {
        this.user = user;
      });
  }
}
