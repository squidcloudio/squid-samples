export interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export enum FormatTypes {
  MONTH_AND_DATE = 'MMMM D',
  MONTH_AND_YEAR = 'MMMM YYYY',
  WEEK_DAY_NAME = 'dd',
  WEEK_DAY_NUMBER = 'D',
  DEFAULT_FORMAT = 'M/D/YYYY',
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
  date?: string;
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
