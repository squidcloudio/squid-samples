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
  newItem = 'newItem',
}

export interface IModalWindowData {
  name: ModalListNames.newList | ModalListNames.newItem;
}

export interface INewList {
  title: string;
  color: string;
}

export interface ITag {
  id: string;
  name: string;
}
