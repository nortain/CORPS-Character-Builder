import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { CharacterSheetComponent } from './character-sheet.component';
import { CharacterThemePointsComponent } from './character-theme-points/character-theme-points.component';
import { CharacterDefensesComponent } from './character-defenses/character-defenses.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent, CharacterThemePointsComponent, CharacterDefensesComponent],

})
export class CharacterSheetModule { }
