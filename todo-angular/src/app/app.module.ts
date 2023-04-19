import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquidModule } from '@squidcloud/angular';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { TodoItemsComponent } from './pages/todo-items/todo-items.component';
import { TodoNavigationComponent } from './pages/todo-navigation/todo-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildrenGuard } from './guards/todo.guard';
import { CalendarSidebarComponent } from './pages/calendar-sidebar/calendar-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListFormComponent } from './forms/list-form/list-form.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { FormButtonsComponent } from './buttons/form-buttons/form-buttons.component';
import { ItemFormComponent } from './forms/item-form/item-form.component';
import { DatePickerComponent } from './inputs/date-picker/date-picker.component';
import { MultiSelectComponent } from './inputs/multi-select/multi-select.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { ItemsAmountComponent } from './components/items-amount/items-amount.component';
import { EditTodoFormComponent } from './forms/edit-todo-form/edit-todo-form.component';
import { AddItemButtonComponent } from './buttons/add-item-button/add-item-button.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { AddTodoButtonComponent } from './buttons/add-todo-button/add-todo-button.component';
import { CalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { TimeSincePipe } from './pipes/timeSince.pipe';
import { CalendarItemsComponent } from './components/calendar-items/calendar-items.component';
import { ExpiredItemsComponent } from './components/expired-items/expired-items.component';
import { CalendarModalWindowComponent } from './calendar-modal-window/calendar-modal-window.component';
import { ThemeButtonComponent } from './buttons/theme-button/theme-button.component';
import { LogoutButtonComponent } from './buttons/logout-button/logout-button.component';

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
    TodoListComponent,
    ListFormComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    ItemFormComponent,
    DatePickerComponent,
    MultiSelectComponent,
    TodoItemComponent,
    EditTodoComponent,
    ItemsAmountComponent,
    EditTodoFormComponent,
    AddItemButtonComponent,
    SidebarNavigationComponent,
    AddTodoButtonComponent,
    CalendarPickerComponent,
    TimeSincePipe,
    CalendarItemsComponent,
    ExpiredItemsComponent,
    CalendarModalWindowComponent,
    ThemeButtonComponent,
    LogoutButtonComponent,
  ],
  imports: [
    BrowserModule,
    SquidModule.forRoot({
      appId: environment.squidAppId,
      region: environment.region,
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
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    NgStyle,
    RouterLink,
    AsyncPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLinkActive,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgMultiSelectDropDownModule,
    NgClass,
    MatCheckboxModule,
    MatMenuModule,
    MatListModule,
    DatePipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
