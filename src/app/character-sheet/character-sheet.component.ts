import {ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Character} from "../shared/character/character";
import {AttributeService} from "../shared/attribute/attribute.service";
import {RaceType} from "../shared/character/race/race-type.enum";
import {DropdownValueObject} from "../shared/ui/dropdown/dropdown-value-object";
import {Level} from "../shared/character/level.enum";
import {ThemePointsContainer} from "../shared/theme-points/theme-points-container";
import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";
import {CharacterDefensesComponent} from "./character-defenses/character-defenses.component";
import {MagicDefenseType} from "../shared/character/magic-defense/magic-defense-type.enum";

@Component({
  selector: 'corps-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSheetComponent implements OnInit, OnChanges {

  character: Character;
  races: DropdownValueObject[];
  subraces: DropdownValueObject[];
  levels: DropdownValueObject[];

  @ViewChild(CharacterDefensesComponent) characterDefense: CharacterDefensesComponent;

  RaceType = RaceType; // expose racetype to the UI
  MagicDefenseType = MagicDefenseType;

  constructor(private attributeService: AttributeService) {}

  ngOnChanges() {
    console.log("ngchanges was called");
  }

  ngOnInit() {
    this.races = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RaceType, false);
    this.levels = this.attributeService.buildArrayAsDropdownArray(this.attributeService.getLevelAsArray());
    this.subraces = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RacialSubType, false);
    const raceType = this.races[0].label;
    this.character = new Character("", RaceType[raceType] as RaceType);
  }

  reloadCharacter(propertyName: string, valueChange: any) {
    console.log("Character has been reloaded");
    this.character[propertyName] = valueChange;
    this.cloneCharacter();
  }

  startReloadWithRace(raceString: string) {
    if (RaceType[raceString] !== RaceType.Primental) {
      this.character.racialSubType = null;
    }
    this.reloadCharacter("raceType", RaceType[raceString]);
  }

  startReloadWithLevel(level: number) {
    this.reloadCharacter("level", level);
  }

  updateSubRace(subrace: string) {
    this.reloadCharacter("racialSubType", RacialSubType[subrace]);

  }

  updateThemePoints(updatedThemePoints: ThemePointsContainer) {
    this.reloadCharacter("themePoints", updatedThemePoints);
  }

  private cloneCharacter() {
    const newChar = new Character(
      this.character.name,
      this.character.raceType,
      this.character.level,
      this.character.racialSubType,
      this.character.themePoints,
      this.character.physicalDefense,
      this.character.weapons,
      this.character.magicDefense,
      this.character.attributes
    );
    this.character = newChar;
  }


}
