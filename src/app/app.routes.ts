import { Routes } from '@angular/router';

import { UserSearchComponent } from './user-search/user-search.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FileSearchComponent } from './file-search/file-search.component';
import { FolderManagerComponent } from './folder-manager/folder-manager.component';

export const routes: Routes = [
  { path: '', component: UserSearchComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'files', component: FileSearchComponent },
  { path: 'folders', component: FolderManagerComponent },
];
