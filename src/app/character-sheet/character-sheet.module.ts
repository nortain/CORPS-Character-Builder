import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent],

})
export class CharacterSheetModule { }
