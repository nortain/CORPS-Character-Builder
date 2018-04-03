import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {Character} from "../../shared/character/character";
import {AttributeBonus} from "../../shared/attribute/character-attribute/attribute-bonus.enum";
import {MagicDefenseType} from "../../shared/character/magic-defense/magic-defense-type.enum";
import {PhysicalDefense} from "../../shared/character/phsyical-defense/physical-defense";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css']
})
export class CharacterDefensesComponent implements OnInit {

  @Input() character: Character;

  constructor() {
  }

  ngOnInit() {
    if (!this.character.physicalDefense) {
      this.character.physicalDefense = new PhysicalDefense();
    }
  }


  getActiveDefenseValue(): number {
    let ad = this.character.physicalDefense.getActiveDefensiveValue();
    ad += this.character.attributes.getBonus(
      AttributeBonus.ArmorBonus,
      this.character.physicalDefense.armor);
    return ad;
  }

  getPassiveDefenseValue(): number {
    return this.character.physicalDefense.getPassiveDefensiveValue();
  }

  getMagicDefensiveValue(magicDefenseType: MagicDefenseType): number {
    let magicDef = this.character.magicDefense[MagicDefenseType[magicDefenseType]].getDefense();
    if (this.character.magicDefenseBonus === magicDefenseType) {
      magicDef++;
    }
    const themePointBonus = this.character.themePoints.getDefensiveBonus();
    if (themePointBonus.length === 1 && themePointBonus[0] === magicDefenseType) {
      magicDef++;
    }
    magicDef += this.character.attributes.getBonus(AttributeBonus.MagicDefense, magicDefenseType);
    return magicDef;
  }

  assignMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName: string, bonusValue: number) {
    this.character.magicDefense[MagicDefenseType[magicDefenseType]].addDefenseBonus(bonusName, bonusValue);
  }

  /**
   * removes bonus for the given magidDefenseType that has a name matching to the string passed in.  If no string is passed in then all bonuses for the magic defense type are removed.
   * @param {MagicDefenseType} magicDefenseType
   * @param {string} bonusName
   */
  removeMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName?: string) {
    this.character.magicDefense[MagicDefenseType[magicDefenseType]].removeDefenseBonus(bonusName);
  }


}
