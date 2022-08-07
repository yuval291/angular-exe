import {TodoList} from "./todo-list";
import {TodoItem} from "./todo-item";

export interface AppState{
  readonly toDoList : TodoList[];
  readonly toDoItem : TodoItem[];
}
