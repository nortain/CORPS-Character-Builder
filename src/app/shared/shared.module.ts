import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "./attribute/attribute.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  declarations: [DropdownComponent],
  providers: [AttributeService],
  exports: [CommonModule, FormsModule, DropdownComponent]
})
export class SharedModule {
}
