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
import { canActivateChild } from './guards/todo.guard';
import { CalendarSidebarComponent } from './pages/calendar-sidebar/calendar-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [canActivateChild],
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
      appId: 'mnhwpkfn8e8e0ozo23',
      region: 'us-east-1.aws',
    }),
    AuthModule.forRoot({
      domain: 'dev-04umd56tv7v5qeyv.us.auth0.com',
      clientId: 'NVTDdwX2iikH7HpcGzqqDXpzndmshbLd',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
