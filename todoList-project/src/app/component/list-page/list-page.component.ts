import { Component, OnInit } from '@angular/core';
import {Observable, map, switchAll} from "rxjs";
import {TodoList} from "../../models/todo-list";
import {StateService} from "../../services/state.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TodoItem} from "../../models/todo-item";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {

  list$!: Observable<TodoList>;
  items$!: Observable<TodoItem[]>;
  isDeletionSafe: boolean = false;
  group = new FormGroup({
    newItem: new FormControl("",[Validators.minLength(10),this.containsWords(3)])
  })


  constructor(private stateService: StateService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const index$ = this.route.params.pipe(
      map(prm => Number(prm['id'])));

    this.list$ = index$.pipe(
      map(index => this.stateService.getListById(index)),
      switchAll());

    this.items$ = this.list$.pipe(
      map(list => this.stateService.getItemsOfList(list.id)),
      switchAll());

  }

  createNewList() {
    this.router.navigate(['lists', -1, 'edit']).then();
  }

  editList(id: number) {
    this.router.navigate(['lists', id, 'edit']).then();
  }

  doDelete() {
    this.isDeletionSafe = !this.isDeletionSafe;
  }

  deleteList(id: number) {
    this.stateService.DeleteList(id).then();
    this.router.navigate(['home']).then();
  }

  control(newItem: string) : FormControl{
    const ctrl = this.group.get(newItem)! as FormControl;
    return ctrl;
  }

  private containsWords(number: number): (ctrl: AbstractControl) => null | ValidationErrors {
    return ctrl => {
      const val = ctrl.value;
      if (typeof(val) !== 'string') return null;

      const letters = val.split(' ');
      if (letters.length >= number) return null;

      return {
        'words': {
          required: number,
          actual: letters.length
        }
      }
    }
  }

  async addItem(id: number): Promise<void> {
    await this.stateService.AddTodoItem(id,this.control("newItem").value);
    this.control("newItem").setValue("")
  }

  async changeToComplete(id: number): Promise<void> {
    await this.stateService.MarkAsCompleted(id);
  }
}
