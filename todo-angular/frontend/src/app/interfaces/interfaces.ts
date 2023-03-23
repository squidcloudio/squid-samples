export interface User {
  username: string;
  email: string;
  avatar: string;
  id: string;
}

export interface IModalWindow {
  [name: string]: boolean;
}

export enum ModalListNames {
  newList = 'newList',
}

export interface INewList {
  title: string;
  color: string;
}
