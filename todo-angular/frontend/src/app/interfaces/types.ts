export type Todo = {
  id: string;
  title: string;
  color: string;
  userId?: string;
};

export type Item = {
  todoId: string;
  title: string;
  userId: string;
  description: string;
  dueDate: Date;
  tag: string;
  completed: boolean;
};
