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
import { TableComponent } from './table/table.component';
import { OptionsComponent } from './options/options.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertUserComponent,
    ReadUsersComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    TableComponent,
    OptionsComponent,
    OptionsDialogComponent,
  ],
  imports: [
    SquidModule.forRoot({
      appId: 'YOUR_APP_ID',
      region: 'us-east-1.aws',
      environmentId: 'dev', // choose one of 'dev' or 'prod'
      squidDeveloperId: 'YOUR_DEVELOPER_ID',
    }),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
