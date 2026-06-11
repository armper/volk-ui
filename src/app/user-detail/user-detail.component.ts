import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { User } from '../user';
import { SearchFile } from '../search-file';
import { UserService } from '../user.service';
import { FileService } from '../file.service';
import { FilesGridComponent } from '../files-grid/files-grid.component';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink, MatIconModule, FilesGridComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private userService = inject(UserService);

  private fileService = inject(FileService);

  user?: User;

  files: SearchFile[] = [];

  filesLoaded = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
    });
    this.fileService.searchFiles(id).subscribe((files) => {
      this.files = files;
      this.filesLoaded = true;
    });
  }

  initials(name: string): string {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  }
}
