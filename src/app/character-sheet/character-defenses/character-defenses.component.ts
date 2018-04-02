import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {Character} from "../../shared/character/character";
import {AttributeBonus} from "../../shared/attribute/character-attribute/attribute-bonus.enum";
import {MagicDefenseType} from "../../shared/character/magic-defense/magic-defense-type.enum";
import {MagicDefense} from "../../shared/character/magic-defense/magic-defense";
import {PhysicalDefense} from "../../shared/character/phsyical-defense/physical-defense";
import {StartingCharacterMagicDefense} from "../../shared/constants/constants";
import {StartingCharacterAttributes} from "../../shared/attribute/character-attribute/starting-character-attributes";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css']
})
export class CharacterDefensesComponent implements OnInit {

  @Input() physicalDefense: PhysicalDefense;
  @Input() magicDefense: StartingCharacterMagicDefense;
  @Input() attributes: StartingCharacterAttributes;
  @Input() magicRacialBonusType: MagicDefenseType;
  @Input() themePoints: ThemePointsContainer;

  constructor() {
  }

  ngOnInit() {
    if (!this.physicalDefense) {
      this.physicalDefense = new PhysicalDefense();
    }
  }


  getActiveDefenseValue(): number {
    let ad = this.physicalDefense.getActiveDefensiveValue();
    ad += this.attributes.getBonus(
      AttributeBonus.ArmorBonus,
      this.physicalDefense.armor);
    return ad;
  }

  getPassiveDefenseValue(): number {
    return this.physicalDefense.getPassiveDefensiveValue();
  }

  getMagicDefensiveValue(magicDefenseType: MagicDefenseType): number {
    let magicDef = this.magicDefense[MagicDefenseType[magicDefenseType]].getDefense();
    if (this.magicRacialBonusType === magicDefenseType) {
      magicDef++;
    }
    const themePointBonus = this.themePoints.getDefensiveBonus();
    if (themePointBonus.length === 1 && themePointBonus[0] === magicDefenseType) {
      magicDef++;
    }
    magicDef += this.attributes.getBonus(AttributeBonus.MagicDefense, magicDefenseType);
    return magicDef;
  }

  assignMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName: string, bonusValue: number) {
    this.magicDefense[MagicDefenseType[magicDefenseType]].addDefenseBonus(bonusName, bonusValue);
  }

  /**
   * removes bonus for the given magidDefenseType that has a name matching to the string passed in.  If no string is passed in then all bonuses for the magic defense type are removed.
   * @param {MagicDefenseType} magicDefenseType
   * @param {string} bonusName
   */
  removeMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName?: string) {
    this.magicDefense[MagicDefenseType[magicDefenseType]].removeDefenseBonus(bonusName);
  }


}
