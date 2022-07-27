import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MainPageState} from "../../models/main-page-state";
import {Observable} from "rxjs";
import {MainPageService} from "../../services/main-page.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  name$!: Observable<String>

  constructor(private mainPageService:MainPageService) { }

  ngOnInit(): void {
    this.name$ = this.mainPageService.getName();
  }

}
