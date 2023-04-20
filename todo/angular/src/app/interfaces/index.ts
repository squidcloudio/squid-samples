import { SupportedSquidRegion } from '@squidcloud/common';
export interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export enum FormatTypes {
  MONTH_AND_DATE = 'MMMM d',
  MONTH_AND_YEAR = 'MMMM YYYY',
  WEEK_DAY_NAME = 'EEEEEE',
  WEEK_DAY_NUMBER = 'd',
  DEFAULT_FORMAT = 'M/D/YYYY',
  ISO_FORMAT = 'MM-DD-YYYY',
}

export enum ModalListNames {
  newList = 'newList',
  newTask = 'newItem',
  editList = 'editTodo',
  editTask = 'editItem',
}

export interface ModalWindowData {
  name: ModalListNames.newList | ModalListNames.newTask | ModalListNames.editList | ModalListNames.editTask;
  id?: string;
  date?: string;
}

export interface Tag {
  id: string;
  name: string;
}
export type List = {
  id: string;
  title: string;
  color: string;
  userId?: string;
};

export type Task = {
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

export interface EnvironmentDetails {
  production: boolean;
  squidAppId: string;
  authDomain: string;
  authClientId: string;
  region: SupportedSquidRegion;
}

export interface Color {
  color: string;
  name: string;
}
