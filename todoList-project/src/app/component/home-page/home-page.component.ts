import { Component, OnInit } from '@angular/core';
import {Observable,map} from "rxjs";
import {AppState} from "../../models/app-state";
import {StateService} from "../../services/state.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {getHtmlTagDefinition} from "@angular/compiler";
import {TodoList} from "../../models/todo-list";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  todoList$!: Observable<number>;
  itemList$!: Observable<number>;
  uncompletedItems$!: Observable<number>;

  current_date!: Date;

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.todoList$ = this.stateService.getAllLists().pipe(
      map(lists => lists.length)
    );

    this.itemList$ = this.stateService.getAllItems().pipe(
      map(lists => lists.length)
    );

    this.uncompletedItems$ = this.stateService.getAllNotCompletedItems().pipe(
      map(lists => lists.length)
    );

    this.current_date = new Date();
  }

  async createNewList(): Promise<void> {
    await this.router.navigate(['lists', -1, 'edit']);
  }

  allCompletedItems() {
    return this.stateService.getAllNotCompletedItems();
  }

  async navigateToAllLists() : Promise<void> {
    await this.router.navigate(['lists']);
  }

  async navigateToAllItems() : Promise<void>{
    await this.router.navigate(['items']);
  }
}
