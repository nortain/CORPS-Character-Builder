import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DropdownComponent } from './ui/dropdown/dropdown.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {AttributeService} from "./attribute/attribute.service";
import { InputComponent } from './ui/input/input.component';
import { SubthemesComponent } from '../character-sheet/character-theme-points/character-subthemes/subthemes.component';
import { SubthemePipe } from './theme-points/subthemes/subtheme.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  declarations: [DropdownComponent, InputComponent, SubthemesComponent, SubthemePipe],
  providers: [AttributeService],
  exports: [CommonModule, FormsModule, DropdownComponent, InputComponent]
})
export class SharedModule {
}
