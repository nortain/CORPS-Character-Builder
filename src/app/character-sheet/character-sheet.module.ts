import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {CharacterAttributesComponent} from './character-attributes/character-attributes.component';
import {CharacterSheetComponent} from './character-sheet.component';
import {CharacterThemePointsComponent} from './character-theme-points/character-theme-points.component';
import {SubthemeComponent} from "./character-subtheme-modal/subthemes/subtheme.component";
import { CharacterSubthemeModalComponent } from './character-subtheme-modal/character-subthemes/character-subtheme-modal.component';
import { CharacterMagicSubthemeComponent } from './character-subtheme-modal/character-magic-subtheme/character-magic-subtheme.component';
import { SpellSelectionComponent } from './character-subtheme-modal/character-magic-subtheme/spell-selection/spell-selection.component';
import { SpellChartComponent } from './character-subtheme-modal/character-magic-subtheme/spell-selection/spell-chart/spell-chart.component';
import { BuildSelectionComponent } from './character-subtheme-modal/character-magic-subtheme/spell-selection/build-selection/build-selection.component';
import {CharacterSubthemeDisplayComponent} from "./character-subtheme-display/character-subtheme-display.component";



@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [CharacterAttributesComponent, CharacterSheetComponent, CharacterThemePointsComponent, SubthemeComponent, CharacterSubthemeModalComponent, CharacterMagicSubthemeComponent, SpellSelectionComponent, SpellChartComponent, BuildSelectionComponent, CharacterSubthemeDisplayComponent],
  entryComponents: [CharacterSubthemeModalComponent]

})
export class CharacterSheetModule {
}
