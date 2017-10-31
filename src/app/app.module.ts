import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent, counter} from './app.component';
import {CoreModule} from "./core/core.module";
import {StoreModule} from "ngrx/@ngrx/store";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.provideStore(counter, 0),
    BrowserModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
