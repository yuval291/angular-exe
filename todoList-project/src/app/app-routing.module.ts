import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {HomePageComponent} from "./component/home-page/home-page.component";
import {ListPageComponent} from "./component/list-page/list-page.component";
import {ListEditComponent} from "./component/list-edit/list-edit.component";
import {ItemsPageComponent} from "./component/items-page/items-page.component";
import {AllListPageComponent} from "./component/all-list-page/all-list-page.component";
import {ErrorMessageComponent} from "./component/error-message/error-message.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'lists', component: AllListPageComponent },
  { path: 'lists/:id', component: ListPageComponent },
  { path: 'lists/:id/edit', component: ListEditComponent },
  { path: 'items',component: ItemsPageComponent },
  { path: '**', component: ErrorMessageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
