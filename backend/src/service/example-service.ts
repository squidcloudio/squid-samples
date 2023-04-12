import { SquidService, secureCollection } from "@squidcloud/backend";
import { log } from "console";

export class ExampleService extends SquidService {
  @secureCollection("todos", "all")
  secureTodosCollection(): boolean {
    return this.isAuthenticated();
  }
  @secureCollection("items", "all")
  secureItemsllection(): boolean {
    return this.isAuthenticated();
  }
}
