import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AppState} from "../../models/app-state";
import {StateService} from "../../services/state.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {getHtmlTagDefinition} from "@angular/compiler";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  state$!: Observable<AppState>;
  current_date!: Date;

  constructor(private stateService: StateService, private router: Router) { }

  ngOnInit(): void {
    this.state$ = this.stateService.getState();
    this.current_date = new Date();
  }

  createNewList() {
    this.router.navigate(['lists', -1, 'edit']).then();
  }

  allCompletedItems() {
    return this.stateService.getAllNotCompletedItems();
  }

  navigateToAllLists() {
    this.router.navigate(['lists']).then();
  }

  navigateToAllItems() {
    this.router.navigate(['items']).then();
  }
}
