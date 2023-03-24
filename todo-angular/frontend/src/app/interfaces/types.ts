import { ITag } from './interfaces';

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
  tags: ITag[];
  completed: boolean;
};
