import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NewListComponent } from './new-list/new-list.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TextInputComponent } from './inputs/text-input/text-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormButtonsComponent } from './buttons/form-buttons/form-buttons.component';
import { NewItemComponent } from './new-item/new-item.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

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
  ],
  exports: [
    TodoListComponent,
    NewListComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    NewItemComponent,
  ],
  providers: [],
  declarations: [
    TodoListComponent,
    NewListComponent,
    ModalWindowComponent,
    TextInputComponent,
    FormButtonsComponent,
    NewItemComponent,
  ],
})
export class SharedModule {}
