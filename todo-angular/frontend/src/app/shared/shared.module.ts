import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NewListComponent } from './new-list/new-list.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { AsyncPipe, NgClass, NgForOf, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormButtonsComponent } from './buttons/form-buttons/form-buttons.component';
import { NewItemComponent } from './new-item/new-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePickerComponent } from './inputs/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MultiSelectComponent } from './inputs/multi-select/multi-select.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { MatMenuModule } from '@angular/material/menu';
import { ItemsAmountComponent } from './items-amount/items-amount.component';

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
  ],
  exports: [
    TodoListComponent,
    NewListComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    NewItemComponent,
    DatePickerComponent,
    MultiSelectComponent,
    TodoItemComponent,
    EditTodoComponent,
    ItemsAmountComponent,
  ],
  providers: [],
  declarations: [
    TodoListComponent,
    NewListComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    NewItemComponent,
    DatePickerComponent,
    MultiSelectComponent,
    TodoItemComponent,
    EditTodoComponent,
    ItemsAmountComponent,
  ],
})
export class SharedModule {}
