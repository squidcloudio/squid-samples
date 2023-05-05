# React Angular

## Overview

This application demonstrates how a user can create, update, delete, and fetch data using only the frontend and
the [Squid Cloud](https://docs.squid.cloud/docs/what-is-squid) service.
For authentication, this application uses [Auth0](https://auth0.com/).

## Start

### Frontend

1. Navigate to the react directory and proceed with installing the npm dependencies:

```
npm install
```

2. Use the command to start the application:

```
npm start
```

3. In the `src/index.tsx:` we initialize Squid and the auth service:

```typescript
{
  <Auth0Provider
    domain="dev-04umd56tv7v5qeyv.us.auth0.com"
    clientId="NVTDdwX2iikH7HpcGzqqDXpzndmshbLd"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <SquidContextProvider
      options={{
        appId: 'mnhwpkfn8e8e0ozo23',
        region: 'us-east-1.aws',
      }}
    >
      <App />
    </SquidContextProvider>
  </Auth0Provider>,
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

2. To connect the frontend client to the local backend, navigate to the react directory and open the `index.tsx` file. Then, replace `us-east-1.aws` with `local`. To update the configuration and connect to the local backend:

```<SquidContextProvider
      options={{
        appId: 'mnhwpkfn8e8e0ozo23',
        region: 'us-east-1.aws',
      }}
    >
```
## Usage

### Authentication

To establish a connection between the frontend client and the local backend, follow these steps:

1. Navigate to the react directory and open the src/index.tsx file.
2. Locate the us-east-1.aws parameter and replace it with local.
3. Save the changes to update the configuration and establish a connection to the local backend.

`src/app/app.module.ts:`

```typescript
 const router = createBrowserRouter([
    {
      path: '/',
      element: <IsAuthContainer />,
    },
    {
      path: '/:id',
      element: <IsAuthContainer />,
    },
  ]);

  return <RouterProvider router={router} />;
}
```

When a user logs in, the **AuthService** retrieves the user's
ID token and sends it to **Squid Cloud**. This functionality is implemented in the **AccountService**, which is responsible for managing user accounts and handling authentication and authorization tasks

`src/App.tsx: `

```typescript
 useEffect(() => {
    const updateAuth = async () => {
      if (isLoading) return;
      if (!isAuthenticated) {
        setAuthIdToken(undefined);
      } else {
        setAuthIdToken(getIdTokenClaims().then((claims) => claims?.__raw));
      }
    };
    updateAuth().then();
  }, [isAuthenticated, isLoading, getIdTokenClaims, setAuthIdToken]);

```

```typescript
 setAuthIdToken(getIdTokenClaims().then((claims) => claims?.__raw));
```

To work with collections, the user needs to obtain a token, which is used to protect collections on the backend. This ensures that only authenticated and authorized users can access and modify collections in the application.

**_Backend:_**

**Squid Cloud** provides a way for the client to protect data from outside access, preventing sensitive information from being exposed.
To achieve this, Squid uses the **secureCollection** decorator, which is explained in more detail in the security rules [documentation](https://docs.squid.cloud/docs/backend/security-rules/)

**'lists' and 'tasks'** are collections that need to be protected.
**'all'** is a method that is protected. There are 4 methods : 'read', 'write', 'update', 'delete'. And 'all' contains all of them.

It means if the unauthorized user tries to get access to one of the collections there will be an error. Only the authorized user can work with collections.

### List collection

After logging in, the user is directed to the main page, which provides an overview of the application's features and functionality. From the main page,
the user can access various collections and perform actions such as creating, updating, and deleting items within them:

![img_1.png](src/app/screenshots/img_1.png)

The left sidebar on the main page contains a collection of lists. This collection includes default lists such as 'Today', 'Tomorrow', and 'Someday'.

`src/pages/MainContainer.tsx:`

```typescript
    const datesList = useQuery(todosCollection.query().where('title', 'in', ['Today', 'Tomorrow', 'Someday']), true);
}

```

There are two types of lists: default and user's.

#### Default collection.

Default lists are pre-existing collections of tasks that are created with expiration dates. These collections include lists such as 'Today', 'Tomorrow', and 'Someday', and the tasks within each list are organized based on their expiration date:

**Today list:** contains tasks that going to be expired today.

**Tomorrow list:** contains tasks that going to be expired tomorrow.

#### User's collection.

A user's collection is a custom collection that is created by the user. This collection can include any items that the user wants to organize, and can be modified and updated as needed.

By clicking the 'New List' button, the user can create a new list using an ListModal (src/modals/ListModaltsx).

![img_2.png](src/app/screenshots/img_2.png)

`createNewList()` creates a new List

`src/modals/ListModal.tsx:`

```typescript
 const createNewList = () => {
    const currentId = uuid();

    if (titleRef.current?.value && color) {
      collection.doc(currentId).insert({
        id: currentId,
        title: titleRef.current?.value || '',
        color: color,
        userId: user?.sub,
        activeLabel: 'In progress',
        completeLabel: 'Completed',
      });
    }

    setOpen(false);
  };
```

#### Change collection

If the user wants to modify a label name in the List collection, they can click the 'edit' button next to the corresponding element.
This will call the `changeListLabel()` method from the ListService, which allows the user to modify the name of the List.

**HTML**

`src/app/pages/list-tasks/list-tasks.html:`

![img_10.png](src/app/screenshots/img_9.png)

`src/modals/EditListModal.tsx:`

```typescript

   const editListLabel = () => {
    collection.doc(id).update({
      activeLabel: activeLabelRef.current?.value || 'In progress',
      completeLabel: completeLabelRef.current?.value || 'Complete',
    });

    setOpen(false);
  };
}

```

#### Delete List.

When the user deletes a list, they are redirected to the 'Today' list page:

Delete list:

`src/components/ListEdit.tsx:`

```typescript

 const deleteItems = () => {
    for (const task of tasksInCurrentList) {
      itemsCollection.doc(task.data.id).delete();
    }
  };

  const deleteTodo = async () => {
    deleteItems();
    await todosCollection.doc(currentItem?.data.id).delete();
    navigate('/today');
  };

```

### Tasks collection:

#### Get Tasks.

When the user clicks on a particular List, they are taken to a page displaying the Tasks related to that List. If the user clicks on one of the default lists, the tasks will be automatically filtered by date.

#### Create Task.

When the user clicks on the 'New Task' button, a new Task for the current List is created using the `addItem()` method:

`src/modals/ItemModal.tsx:`

```  const addItem = () => {
    const itemNewId = uuid();
    collection.doc(itemNewId).insert({
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      dueDate: new Date(fromCalendar ? currentDate : value).toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      } as Intl.DateTimeFormatOptions),
      tags,
      listId: fromCalendar || fromDefaultList ? selectedValue.id : todos.data.id,
      userId: user?.sub,
      listColor: fromCalendar || fromDefaultList ? selectedValue.color : todos.data.color,
      completed: false,
      id: itemNewId,
    });

    setValue('');
    setTags([]);
    setOpen(false);
  };
```

#### Change Task

1. When the user clicks on the pencil icon, they can edit the task by using the `updateItem()` method from the TaskService.:

![img_15.png](src/app/screenshots/img_10.png)

![img_16.png](src/app/screenshots/img_11.png)

`src/modals/EditItem.tsx:`

```const updateItem = () => {
    todosCollection.doc(currentItem.data.id).update({
      title: titleRef.current?.value ?? '',
      description: descriptionRef.current?.value ?? '',
      dueDate: new Date(value).toLocaleDateString('en-Us', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      } as Intl.DateTimeFormatOptions),
      tags,
      id: currentItem.data.id,
    });

    setValue('');
    setTags([]);
    setOpen(false);
  };
```

2. By clicking the checkbox, the user can change the status of the task from active to complete:

```const changeStatusToCompleted = () => {
    for (const task of inProgressTasksInCurrentList) {
      itemsCollection.doc(task.data.id).update({ completed: true });
    }
  };
```

#### Delete Task.

If the user deletes a List, all tasks related to that List are automatically deleted.
Additionally, the user can manually delete a task by clicking the delete button on the calendar sidebar:

![img_17.png](src/app/screenshots/img_17.png)

`src/app/services/task.service.ts:`

```typescript
  const deleteCurrentItem = () => {
    itemsCollection.doc(currentItem.data.id).delete();
  };
```
