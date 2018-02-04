import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { CharacterSheetComponent } from './character-sheet.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent],

})
export class CharacterSheetModule { }
