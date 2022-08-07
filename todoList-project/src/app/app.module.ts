import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AllListPageComponent } from './component/all-list-page/all-list-page.component';
import { ErrorMessageComponent } from './component/error-message/error-message.component';
import { ItemsPageComponent } from './component/items-page/items-page.component';
import { ListEditComponent } from './component/list-edit/list-edit.component';
import { ListPageComponent } from './component/list-page/list-page.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AllListPageComponent,
    ErrorMessageComponent,
    ItemsPageComponent,
    ListEditComponent,
    ListPageComponent,
    NavBarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
