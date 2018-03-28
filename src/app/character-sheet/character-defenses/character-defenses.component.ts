import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Character} from "../../shared/character/character";
import {AttributeBonus} from "../../shared/attribute/character-attribute/attribute-bonus.enum";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css']
})
export class CharacterDefensesComponent implements OnChanges {
  @Input() character: Character;

  constructor() {
    this.updateDefenses();
  }

  ngOnChanges() {
    this.updateDefenses();
  }

  updateDefenses() {

  }

  getActiveDefenseValue() {
    let ad = this.character.physicalDefense.getActiveDefensiveValue();
    ad += this.character.attributes.getBonus(
      AttributeBonus.ArmorBonus,
      this.character.physicalDefense.armor);
    return ad;
  }

  getPassiveDefenseValue() {
    return this.character.physicalDefense.getPassiveDefensiveValue();
  }


}
