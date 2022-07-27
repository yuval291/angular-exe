import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {State} from "../models/state";

@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  private name = " ";
  private name$ = new BehaviorSubject<String>(this.name);

  constructor() { }

  getName():Observable<String>  {
    return this.name$.asObservable();
  }
}
