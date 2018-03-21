import { FileService } from './file.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';

import { MatToolbarModule, MatListModule, MatInputModule, MatFormFieldModule, MatCardModule, MatTableModule } from '@angular/material';
import { UserServiceService } from './user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FilesGridComponent } from './files-grid/files-grid.component';

const routes: Routes = [
  { path: '', component: UserSearchComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent,
    UserDetailComponent,
    FilesGridComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserSearchComponent, UserServiceService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
