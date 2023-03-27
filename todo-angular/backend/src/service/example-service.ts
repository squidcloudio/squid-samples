import { SquidService, trigger } from "@squidcloud/backend";
import { TriggerRequest } from "@squidcloud/common";

export interface ITag {
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
  tags: ITag[];
  completed: boolean;
};

export class ExampleService extends SquidService {
  @trigger("local", "todos")
  async handleTodoDelete(request: TriggerRequest): Promise<void> {
    let itemsFormCurrentTodo;
    console.log(request.squidDocId);
    if (request.mutationType === "delete") {
      itemsFormCurrentTodo = await this.squid
        .collection<Item>("items")
        .query()
        .where("todoId", "==", request.squidDocId)
        .snapshot();
    }
  }
}
