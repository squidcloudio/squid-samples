import { Moment } from 'moment';

export interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export interface ModalWindow {
  [name: string]: boolean;
}

export enum ModalListNames {
  newList = 'newList',
  newItem = 'newItem',
  editTodo = 'editTodo',
  editItem = 'editItem',
}

export interface ModalWindowData {
  name: ModalListNames.newList | ModalListNames.newItem | ModalListNames.editTodo | ModalListNames.editItem;
  id?: string;
}

export interface Tag {
  id: string;
  name: string;
}
export type Todo = {
  id: string;
  title: string;
  color: string;
  userId?: string;
};

export type Item = {
  id: string;
  todoId: string;
  title: string;
  userId?: string;
  description: string;
  dueDate: string;
  tags: Tag[];
  completed: boolean;
  todoColor: string;
};
export interface CalendarList {
  date: string;
  weekdayName: string;
  weekDayNumber: string;
}
export interface SelectedDate {
  date: string;
  displayDate: string;
}
export interface DateSidebarItems extends Item {
  todoColor: string;
}
