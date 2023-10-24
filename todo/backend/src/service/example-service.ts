import { SquidService, secureCollection } from '@squidcloud/backend';

export class ExampleService extends SquidService {
  @secureCollection('lists', 'all')
  secureListCollection(): boolean {
    return this.isAuthenticated();
  }
  @secureCollection('tasks', 'all')
  secureTaskCollection(): boolean {
    return this.isAuthenticated();
  }
}
