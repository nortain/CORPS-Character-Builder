import {Component, EventEmitter, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Character} from "../shared/character/character";
import {AttributeService} from "../shared/attribute/attribute.service";
import {RaceType} from "../shared/character/race/race-type.enum";
import {DropdownValueObject} from "../shared/ui/dropdown/dropdown-value-object";
import {Level} from "../shared/character/level.enum";
import {ThemePointsContainer} from "../shared/theme-points/theme-points-container";
import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";

@Component({
  selector: 'corps-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {

  character: Character;
  races: DropdownValueObject[];
  subraces: DropdownValueObject[];
  levels: DropdownValueObject[];

  RaceType = RaceType; // expose racetype to the UI

  @Output() characterEmitter: EventEmitter<Character>;

  constructor(private attributeService: AttributeService) {
    this.characterEmitter = new EventEmitter<Character>();
  }

  ngOnInit() {
    this.races = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RaceType, false);
    this.levels = this.attributeService.buildArrayAsDropdownArray(this.attributeService.getLevelAsArray());
    this.subraces = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RacialSubType, false);
    const raceType = this.races[0].label;
    this.character = new Character("", RaceType[raceType] as RaceType);
  }

  reloadCharacter(raceType: RaceType, level: Level) {
    console.log("Character has been reloaded");
    this.character = new Character(this.character.name, raceType, level, this.character.racialSubType, this.character.themePoints);
    this.characterEmitter.emit(this.character);
  }

  startReloadWithRace(raceString: string) {
    if (RaceType[raceString] !== RaceType.Primental) {
      this.character.racialSubType = null;
    }
    this.reloadCharacter(RaceType[raceString], this.character.level);
  }

  startReloadWithLevel(level: number) {
    this.reloadCharacter(this.character.raceType, level);
  }

  updateSubRace(subrace: string) {
    this.character.racialSubType = RacialSubType[subrace];
  }

  updateThemePoints(updatedThemePoints: ThemePointsContainer) {
    this.character.themePoints = updatedThemePoints;
  }

}
