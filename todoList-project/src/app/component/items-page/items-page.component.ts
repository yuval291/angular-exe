import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TodoItem} from "../../models/todo-item";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-items-page',
  templateUrl: './items-page.component.html',
  styleUrls: ['./items-page.component.css']
})
export class ItemsPageComponent implements OnInit {

  items$!: Observable<TodoItem[]>;

  constructor(private stateService: StateService) { }

  ngOnInit(): void {
    this.items$ = this.stateService.getAllNotCompletedItems();
  }

  async changeToComplete(id: number) :Promise<void>{
    await this.stateService.MarkAsCompleted(id);
  }
}
