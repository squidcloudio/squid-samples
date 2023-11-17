import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquidModule } from '@squidcloud/angular';

import { InsertUserComponent } from './insert-user/insert-user.component';
import { ReadUsersComponent } from './read-users/read-users.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertUserComponent,
    ReadUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    SquidModule.forRoot({
      appId: 'YOUR_APP_ID',
      region: 'YOUR_REGION', // example: 'us-east-1.aws'
      environmentId: 'dev | prod', // choose one of 'dev' or 'prod'
      squidDeveloperId: 'YOUR_DEVELOPER_ID'
    }),
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
