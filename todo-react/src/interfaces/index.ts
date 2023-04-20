export interface Tag {
  id: string;
  name: string;
}

export type List = {
  id: string;
  title?: string;
  color: string;
  userId: string;
};

export type Task = {
  id: string;
  todoId: string;
  todoColor: string;
  title: string;
  userId?: string;
  description: string;
  dueDate?: string;
  tags: Tag[];
  completed: boolean;
};
