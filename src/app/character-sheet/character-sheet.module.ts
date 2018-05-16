import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CharacterAttributesComponent} from './character-attributes/character-attributes.component';
import {CharacterSheetComponent} from './character-sheet.component';
import {CharacterThemePointsComponent} from './character-theme-points/character-theme-points.component';
import {SubthemeComponent} from "./character-subtheme-modal/subthemes/subtheme.component";
import { CharacterSubthemeModalComponent } from './character-subtheme-modal/character-subthemes/character-subtheme-modal.component';
import { CharacterMagicSubtehemeComponent } from './character-subtheme-modal/character-magic-subteheme/character-magic-subteheme.component';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent, CharacterThemePointsComponent, SubthemeComponent, CharacterSubthemeModalComponent, CharacterMagicSubtehemeComponent],
  entryComponents: [CharacterSubthemeModalComponent]

})
export class CharacterSheetModule {
}
