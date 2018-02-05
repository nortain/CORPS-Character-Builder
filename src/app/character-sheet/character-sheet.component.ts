import {Component, OnInit} from '@angular/core';
import {Character} from "../shared/character/character";
import {Race} from "../shared/character/race/race";
import {AttributeService} from "../shared/attribute/attribute.service";
import {RaceType} from "../shared/character/race/race-type.enum";
import {DropdownValueObject} from "../shared/ui/dropdown/dropdown-value-object";

@Component({
  selector: 'corps-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css']
})
export class CharacterSheetComponent implements OnInit {
  character: Character;
  races: DropdownValueObject[];

  constructor(private attributeService: AttributeService) {

  }

  ngOnInit() {
    this.races = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RaceType, false);
    const raceType = this.races[0].label;
    this.character = new Character("Bob", RaceType[raceType] as RaceType);
  }

  reloadCharacter(raceType) {

  }

}
