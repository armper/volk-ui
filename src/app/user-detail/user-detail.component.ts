import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { User } from '../user';
import { UserService } from '../user.service';
import { FilesGridComponent } from '../files-grid/files-grid.component';

@Component({
  selector: 'app-user-detail',
  imports: [MatCardModule, FilesGridComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);

  private userService = inject(UserService);

  user?: User;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
    });
  }
}
