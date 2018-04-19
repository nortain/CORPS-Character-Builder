import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CharacterAttributesComponent} from './character-attributes/character-attributes.component';
import {CharacterSheetComponent} from './character-sheet.component';
import {CharacterThemePointsComponent} from './character-theme-points/character-theme-points.component';
import {SubthemeComponent} from "./character-subtheme-modal/character-subthemes/subtheme.component";
import { CharacterSubthemeModalComponent } from './character-subtheme-modal/character-subtheme-modal.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent, CharacterThemePointsComponent, SubthemeComponent, CharacterSubthemeModalComponent],
  entryComponents: [SubthemeComponent]

})
export class CharacterSheetModule {
}
