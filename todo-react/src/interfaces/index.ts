export interface Tag {
  id: string;
  name: string;
}

export type List = {
  id: string;
  title?: string;
  color: string;
  userId: string;
  activeLabel: string;
  completeLabel: string;
};

export type Task = {
  id: string;
  listId: string;
  title: string;
  userId?: string;
  description: string;
  dueDate: string;
  tags: Tag[];
  completed: boolean;
  listColor: string;
};
