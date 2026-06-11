import { Routes } from '@angular/router';

import { UserSearchComponent } from './user-search/user-search.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

export const routes: Routes = [
  { path: '', component: UserSearchComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
];
