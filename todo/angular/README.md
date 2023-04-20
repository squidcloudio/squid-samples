# Todo Angular

## Overview

This application demonstrates how a user can create, update, delete, and fetch data using only the frontend and
the [Squid Cloud](https://docs.squid.cloud/docs/what-is-squid) service.
For authentication, this application uses [Auth0](https://auth0.com/).

## Start

### Frontend

1.Please navigate to the angular directory and proceed with installing the npm dependencies:

```
npm install
```

2. Use the command to start the application:

```
npm start
```

3. In the `src/app/app.module.ts:` we initialize Squid and the auth service:

```typescript
{
    ...
  imports: [
    BrowserModule,
    SquidModule.forRoot({
      appId: environment.squidAppId,
      region: environment.region,
    }),
    AuthModule.forRoot({
      domain: environment.authDomain,
      clientId: environment.authClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    ...
    
}

```
### Backend.

Getting started with Squid Cloud involves generating a backend template project. The first step is to install the Squid Cloud CLI:

```
 npm install -g @squidcloud/cli
```

Once the Squid Cloud CLI is installed, you can generate a template project using the following command which can be copied from the application overview page in the Squid Cloud Console:

```
squid init todo-backend --appId mnhwpkfn8e8e0ozo23 --apiKey 04d39b3c-2c6d-4eab-8d23-3d11eb2e8c65
```

1. Got to the backend directory and type:

```
squid start
```

2. To connect the frontend client to the local backend, navigate to the angular directory and open the `app.module.ts` file. Then, replace `us-east-1.aws` with `local`. To update the configuration and connect to the local backend:

```typescript
SquidModule.forRoot({
  appId: environment.squidAppId,
  region: 'local',
});
```

**_environment_** contains apiKeys for Squid and Auth0 in `src/environments`

## Usage

### Authentication

To establish a connection between the frontend client and the local backend, follow these steps:

1. Navigate to the angular directory and open the app.module.ts file.
2. Locate the us-east-1.aws parameter and replace it with local.
3. Save the changes to update the configuration and establish a connection to the local backend.

`src/app/app.module.ts:`

```typescript
const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    canActivateChild: [ChildrenGuard],
    children: [
      {
        path: '',
        component: ListTasksComponent,
      },
      {
        path: ':id',
        component: ListTasksComponent,
      },
    ],
  },
];
```

When a user logs in, the **AuthService** retrieves the user's
ID token and sends it to **Squid Cloud**. This functionality is implemented in the **AccountService**, which is responsible for managing user accounts and handling authentication and authorization tasks

`src/app/services/account.service.ts:`

```typescript
  constructor(private readonly authService: AuthService, private readonly squid: Squid) {
  this.authService.idTokenClaims$.subscribe(idToken => {
    if (!idToken) this.authService.loginWithRedirect();
    if (idToken) {
      const rawIdToken = idToken?.__raw;
      this.squid.setAuthIdToken(rawIdToken);
    }
  });
}

```

The **idTokenClaims** is an observable that returns the user's token. If the token exists, the AccountService retrieves it and sends it to the **_squid cloud service_**:

```typescript
this.squid.setAuthIdToken(idToken);
```

To work with collections, the user needs to obtain a token, which is used to protect collections on the backend. This ensures that only authenticated and authorized users can access and modify collections in the application.

**_Backend:_**

**Squid Cloud** provides a way for the client to protect data from outside access, preventing sensitive information from being exposed.
To achieve this, Squid uses the **secureCollection** decorator, which is explained in more detail in the security rules [documentation](https://docs.squid.cloud/docs/backend/security-rules/)

`src/service/example-service.ts:`

```typescript
import { SquidService, secureCollection } from "@squidcloud/backend";

export class ExampleService extends SquidService {
  @secureCollection("lists", "all")
  secureListCollection(): boolean {
    return this.isAuthenticated();
  }
  @secureCollection("tasks", "all")
  secureTaskCollection(): boolean {
    return this.isAuthenticated();
  }
}
```

**'lists' and 'tasks'** are collections that need to be protected.
**'all'** is a method that is protected. There are 4 methods : 'read', 'write', 'update', 'delete'. And 'all' contains all of them.

It means if the unauthorized user tries to get access to one of the collections there will be an error. Only the authorized user can work with collections.

### List collection

After logging in, the user is directed to the main page, which provides an overview of the application's features and functionality. From the main page,
the user can access various collections and perform actions such as creating, updating, and deleting items within them:

![img_1.png](img_1.png)

The left sidebar on the main page contains a collection of lists. This collection includes default lists such as 'Today', 'Tomorrow', and 'Someday'.
The 'ListService' is responsible for providing the method that allows users to access collections:

`src/app/services/todos.service.ts:`

```typescript
  observeDefaultCollection(): Observable<List[]> {
  return this.listCollection
    .query()
    .in('title', ['Today', 'Tomorrow', 'Someday'])
    .sortBy('userId')
    .snapshots()
    .pipe(map(todos => todos.map(todo => todo.data)));
}

```

There are two types of lists: default and user's.

#### Default collection.

Default lists are pre-existing collections of tasks that are created with expiration dates. These collections include lists such as 'Today', 'Tomorrow', and 'Someday', and the tasks within each list are organized based on their expiration date:

**Today list:** contains tasks that going to be expired today.

**Tomorrow list:** contains tasks that going to be expired tomorrow.

**Someday list:** contains tasks that going to be expired later or already expired.

#### User's collection.

A user's collection is a custom collection that is created by the user. This collection can include any items that the user wants to organize, and can be modified and updated as needed.

By clicking the 'New List' button, the user can create a new list using an **Angular Form** that is provided by the ListService.

![img_2.png](img_2.png)

**HTML**

`src/app/shared/forms/list-form/list-form.component.html:`

![img_8.png](src/app/screenshots/img_8.png)

`setNewList()` creates a new Todo using `createNewList()` method from todoService

`src/app/services/list.service.ts:`

```typescript
  async createNewList(title: string, color: string): Promise<void> {
  const userId = await this.accountService.getUser();
  const listId = self.crypto.randomUUID();
  const newList: List = {
  id: listId,
  userId: userId?.id,
  title: title,
  color: color,
};
await this.listCollection.doc(newList.id).insert(newList);
}
```

#### Change collection

If the user wants to modify an existing element in the List collection, they can click the 'edit' button next to the corresponding element.
This will call the `changeList()` method from the ListService, which allows the user to modify the name of the List.

**HTML**

`src/app/pages/list-tasks/list-tasks.html:`

![img_10.png](src/app/screenshots/img_10.png)

`src/app/services/list.service.ts:`

```typescript

  changeList(id: string, newTitle: string): void {
    this.listCollection.doc(id).update({ title: newTitle });
  }
  
```

#### Delete List.

When the user deletes a list, they are redirected to the 'Today' list page:

Delete list:

`src/app/services/list.service.ts:`

```typescript

  deleteList(): void {
    if (this.currentList?.id) {
      this.listCollection.doc(this.currentList?.id).delete();
    }
    this.router.navigate(['', 'today']);
  }

```

### Tasks collection:

`this.taskCollection` is a shortcut for `this.squid.collection<Task>('tasks')`

#### Get Tasks.

When the user clicks on a particular List, they are taken to a page displaying the Tasks related to that List. If the user clicks on one of the default lists, the tasks will be automatically filtered by date. To retrieve the tasks, the `observeTaskList()` method from the TasksService is called.

`src/app/pages/list-tasks/list-tasks.component.html:`

![img_13.png](src/app/screenshots/img_13.png)

`src/app/services/task.service.ts:`

```typescript
  observeTaskList(todoId: string): Observable<Task[]> {
  const today = dayjs().format('M/D/YYYY');
  const tomorrow = dayjs().add(1, 'day').format('M/D/YYYY');
  return this.accountService.observeUser().pipe(
    switchMap(user => {
      if (!user) return NEVER;
      const query = this.taskCollection.query().eq('userId', user.id);

      switch (todoId) {
        case 'today':
          query.eq('dueDate', today);
          break;
        case 'tomorrow':
          query.eq('dueDate', tomorrow);
          break;
        case 'someday':
          query.nin('dueDate', [today, tomorrow]);
          break;
        default:
          return this.taskCollection
            .query()
            .eq('todoId', todoId)
            .eq('userId', user.id)
            .snapshots()
            .pipe(map(items => items.map(item => item.data)));
      }
      return query.snapshots().pipe(map(items => items.map(item => item.data)));
    }),
  );
}


```

#### Create Task.

When the user clicks on the 'New Task' button, a new Task for the current List is created using the `addNewTask()` method from the TaskService:

`src/app/services/task.service.ts:`

```typescript
  addNewTask(item: Task): void {
  this.taskCollection.doc(item.id).insert(item).then();
}
```

#### Change Task

1. When the user clicks on the pencil icon, they can edit the task by using the `changeTask()` method from the TaskService.:

![img_15.png](src/app/screenshots/img_15.png)

![img_16.png](src/app/screenshots/img_16.png)

`src/app/services/task.service.ts:`

```typescript
  async changeTask(id: string, task: Task): Promise<void> {
  await this.taskCollection
    .doc(id)
    .update({ title: task.title, description: task.description, dueDate: task.dueDate, tags: task.tags });
}
```

2. By clicking the checkbox, the user can change the status of the task from active to complete:

```typescript
  async changeTaskStatus(id: string): Promise<void> {
  const currentItem = await this.taskCollection.doc(id).snapshot();
  await this.taskCollection.doc(id).update({ completed: !currentItem?.data.completed });
}
```

#### Delete Task.

If the user deletes a List, all tasks related to that List are automatically deleted.
Additionally, the user can manually delete a task by clicking the delete button on the calendar sidebar:

![img_17.png](src/app/screenshots/img_17.png)

`src/app/services/task.service.ts:`

```typescript
  deleteTask(id: string): void {
  if (id) this.taskCollection.doc(id).delete().then();
}
```

### Calendar

If there are no items related to a particular date, the "New Task" button will appear, allowing the user to add new Task to the selected date.

![img_18.png](src/app/screenshots/img_18.png)

get Tasks by date:

`src/app/services/task.service.ts:`

```typescript
  observeTasksSortedByDate(date: string): Observable<Task[] | []> {
  return this.accountService.observeUser().pipe(
    switchMap(user => {
      if (!user) return NEVER;
      return this.taskCollection
        .query()
        .eq('userId', user.id)
        .eq('dueDate', date)
        .snapshots()
        .pipe(map(items => items.map(item => item.data)));
    }),
  );
}

```

There is a list of expired tasks below the 'active tasks' section. These tasks have already passed their expiration date:

![img.png](img.png)
