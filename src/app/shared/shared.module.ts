import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "./attribute/attribute.service";
import { InputComponent } from './ui/input/input.component';
import { SubthemePipe } from './theme-points/subthemes/subtheme.pipe';
import { CastleCasePipe } from './pipes/castle-case.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  declarations: [DropdownComponent, InputComponent, SubthemePipe, CastleCasePipe],
  providers: [AttributeService],
  exports: [CommonModule, FormsModule, DropdownComponent, InputComponent, SubthemePipe, CastleCasePipe]
})
export class SharedModule {
}
