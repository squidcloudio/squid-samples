import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SquidModule } from '@squidcloud/angular';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterLink, RouterLinkActive, RouterModule, Routes } from '@angular/router';
import { ListTasksComponent } from './pages/list-tasks/list-tasks.component';
import { ListNavigationComponent } from './pages/list-navigation/list-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChildrenGuard } from './guards/list.guard';
import { CalendarSidebarComponent } from './pages/calendar-sidebar/calendar-sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ListCatalogueComponent } from './components/list-catalogue/list-catalogue.component';
import { ListFormComponent } from './forms/list-form/list-form.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { FormButtonsComponent } from './buttons/form-buttons/form-buttons.component';
import { TaskFormComponent } from './forms/task-form/task-form.component';
import { DatePickerComponent } from './inputs/date-picker/date-picker.component';
import { MultiSelectComponent } from './inputs/multi-select/multi-select.component';
import { ListTaskComponent } from './components/list-task/list-task.component';
import { EditItemInfoComponent } from './components/edit-item-info/edit-item-info.component';
import { TasksAmountComponent } from './components/tasks-amount/tasks-amount.component';
import { EditListFormComponent } from './forms/edit-list-form/edit-list-form.component';
import { AddTaskButtonComponent } from './buttons/add-task-button/add-task-button.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { AddListButtonComponent } from './buttons/add-list-button/add-list-button.component';
import { CalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { TimeSincePipe } from './pipes/timeSince.pipe';
import { CalendarTasksComponent } from './components/calendar-tasks/calendar-tasks.component';
import { ExpiredTasksComponent } from './components/expired-tasks/expired-tasks.component';
import { CalendarModalWindowComponent } from './calendar-modal-window/calendar-modal-window.component';
import { ThemeButtonComponent } from './buttons/theme-button/theme-button.component';
import { LogoutButtonComponent } from './buttons/logout-button/logout-button.component';
import { ListSelectComponent } from './inputs/list-select/list-select.component';
import { EditLabelComponent } from './components/edit-label/edit-label.component';
import { EditLabelFormComponent } from './forms/edit-label-form/edit-label-form.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [ChildrenGuard],
    children: [
      {
        path: '',
        component: ListTasksComponent,
      },
      {
        path: ':id',
        component: ListTasksComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ListTasksComponent,
    ListNavigationComponent,
    CalendarSidebarComponent,
    ListCatalogueComponent,
    ListFormComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    TaskFormComponent,
    DatePickerComponent,
    MultiSelectComponent,
    ListTaskComponent,
    EditItemInfoComponent,
    TasksAmountComponent,
    EditListFormComponent,
    AddTaskButtonComponent,
    SidebarNavigationComponent,
    AddListButtonComponent,
    CalendarPickerComponent,
    TimeSincePipe,
    CalendarTasksComponent,
    ExpiredTasksComponent,
    CalendarModalWindowComponent,
    ThemeButtonComponent,
    LogoutButtonComponent,
    ListSelectComponent,
    EditLabelComponent,
    EditLabelFormComponent,
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
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
