import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquidModule } from '@squidcloud/angular';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoItemsComponent } from './pages/todo-items/todo-items.component';
import { TodoNavigationComponent } from './pages/todo-navigation/todo-navigation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ChildrenGuard } from './guards/todo.guard';
import { CalendarSidebarComponent } from './pages/calendar-sidebar/calendar-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [ChildrenGuard],
    children: [
      {
        path: '',
        component: TodoItemsComponent,
      },
      {
        path: ':id',
        component: TodoItemsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TodoItemsComponent,
    TodoNavigationComponent,
    CalendarSidebarComponent,
  ],
  imports: [
    BrowserModule,
    SquidModule.forRoot({
      appId: environment.squidAppId,
      region: 'us-east-1.aws',
    }),
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
