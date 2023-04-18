import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { ListFormComponent } from './forms/list-form/list-form.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormButtonsComponent } from './buttons/form-buttons/form-buttons.component';
import { ItemFormComponent } from './forms/item-form/item-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePickerComponent } from './inputs/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectComponent } from './inputs/multi-select/multi-select.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { MatMenuModule } from '@angular/material/menu';
import { ItemsAmountComponent } from './components/items-amount/items-amount.component';
import { EditTodoFormComponent } from './forms/edit-todo-form/edit-todo-form.component';
import { AddItemButtonComponent } from './buttons/add-item-button/add-item-button.component';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { MatListModule } from '@angular/material/list';
import { AddTodoButtonComponent } from './buttons/add-todo-button/add-todo-button.component';
import { CalendarPickerComponent } from './components/calendar-picker/calendar-picker.component';
import { TimeSincePipe } from '../pipes/timeSince.pipe';
import { CalendarItemsComponent } from './components/calendar-items/calendar-items.component';
import { ExpiredItemsComponent } from './components/expired-items/expired-items.component';
import { CalendarModalWindowComponent } from './calendar-modal-window/calendar-modal-window.component';
import { ThemeButtonComponent } from './buttons/theme-button/theme-button.component';
import { LogoutButtonComponent } from './buttons/logout-button/logout-button.component';

@NgModule({
  imports: [
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
  exports: [
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
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
})
export class SharedModule {}
