import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable , map} from "rxjs";
import {AppState} from "../models/app-state";
import {TodoList} from "../models/todo-list";
import {TodoItem} from "../models/todo-item";


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private appState!: AppState;
  private appState$ = new BehaviorSubject<AppState>(this.appState);

  constructor() {
    this.appState = {
      toDoList: [],
      toDoItem:[]
    }
    const list1: TodoList =
      {id: 1, caption: "Home", description: "this is the home list", imageUrl: "home", color:"blue"};
    const list2: TodoList =
      {id: 2, caption: "Work", description: "this is the work list", imageUrl: "work", color:"orange"};
    const list3: TodoList =
      {id: 3, caption: "Shopping", description: "this is the shopping list", imageUrl: "shopping", color:"pink"};
    const list4: TodoList =
      {id: 4, caption: "Event", description: "this is the event list", imageUrl: "event", color:"red"};
    const item1: TodoItem = {id: 1, caption: "item1", listId: 1, isCompleted: true};
    const item2: TodoItem = {id: 2, caption: "item2", listId: 1, isCompleted: false};
    this.appState.toDoList.push(list1, list2, list3, list4);
    this.appState.toDoItem.push(item1, item2);
    this.appState$.next(this.appState);
  }

  getState(): Observable<AppState> {
    return this.appState$.asObservable();
  }

  getAllLists(): Observable<TodoList[]>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoList)
    );
  }

  getListById(id:number): Observable<TodoList>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoList.find(list => list.id===id)!)
    );
  }

  getAllItems(): Observable<TodoItem[]>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoItem)
    );
  }

  getItem(id:number): Observable<TodoItem | undefined>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoItem.find(item => item.id===id))
    );
  }

  getItemsOfList(listId:number): Observable<TodoItem[]>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoItem.filter(item => item.listId===listId)!)
    );
  }

  getAllNotCompletedItems(): Observable<TodoItem[]>{
    return this.appState$.asObservable().pipe(
      map(appState => appState.toDoItem.filter(item => item.isCompleted===false))
    );
  }

  /*---------------------------------------------------------------------------*/

  async AddList(caption:string, description:string, color:string, icon:string): Promise<number>{
    const list: TodoList = {
      id: Math.random() * 1000,
      caption: caption,
      description: description,
      color: color,
      imageUrl: icon };

    this.appState = {
      ...this.appState,
      toDoList: [
        ...this.appState.toDoList,
        list
      ]
    };
    this.appState$.next(this.appState);
    return list.id;
  }

  async ModifyList(list: TodoList): Promise<void>{
    const index = this.appState.toDoList.findIndex(data => data.id===list.id)
    this.appState.toDoList[index]=list;

    this.appState$.next(this.appState);
  }

  async AddTodoItem(listId: number, caption: string): Promise<number>{
    const item: TodoItem = {
      id: Math.random() * 1000,
      caption: caption,
      listId : listId ,
      isCompleted : false
    };

    this.appState = {
      ...this.appState,
      toDoItem: [
        ...this.appState.toDoItem,
        item
      ]
    };
    this.appState$.next(this.appState);
    return item.id;
  }

  async MarkAsCompleted(itemId: number): Promise<void>{
    const index= this.appState.toDoItem.findIndex(item => item.id===itemId)
    this.appState.toDoItem[index] = {...this.appState.toDoItem[index],isCompleted:true}
    this.appState$.next(this.appState);
  }

  async DeleteList(listId : number): Promise<void>{
    this.appState = {
      ...this.appState,
      toDoList: this.appState.toDoList.filter(list => list.id !== listId),
      toDoItem: this.appState.toDoItem.filter(item => item.listId !== listId)
    }
    this.appState$.next(this.appState);
  }

}
