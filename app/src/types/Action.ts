import { Task } from "./Task";


export type Action = {
  type: 'changed' | 'deleted' | 'added';
  id?: number;
  text?: any;
  task?: Task;
};
