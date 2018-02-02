import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  declarations: [DropdownComponent],
  exports: [CommonModule, FormsModule, DropdownComponent]
})
export class SharedModule {
}
