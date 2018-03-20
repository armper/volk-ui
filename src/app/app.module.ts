import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserSearchComponent } from './user-search/user-search.component';

import { MatToolbarModule, MatListModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { UserServiceService } from './user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserSearchComponent },
  { path: 'searchuser/:id', component: UserSearchComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    UserSearchComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserSearchComponent, UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
