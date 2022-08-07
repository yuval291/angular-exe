import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import {TodoList} from "../../models/todo-list";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-all-list-page',
  templateUrl: './all-list-page.component.html',
  styleUrls: ['./all-list-page.component.css']
})
export class AllListPageComponent implements OnInit {

  lists$!: Observable<TodoList[]>;

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.lists$ = this.stateService.getAllLists();
  }

  onListSelect(id: number) {
    this.router.navigate(['lists', id]).then();
  }

  onNewList() {
    this.router.navigate(['lists', -1, 'edit']).then();
  }
}
