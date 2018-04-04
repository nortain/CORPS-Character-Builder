import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {AttributeBonus} from "../../shared/attribute/character-attribute/attribute-bonus.enum";
import {MagicDefenseType} from "../../shared/character/magic-defense/magic-defense-type.enum";
import {PhysicalDefense} from "../../shared/character/phsyical-defense/physical-defense";
import {StartingCharacterAttributes} from "../../shared/attribute/character-attribute/starting-character-attributes";
import {StartingCharacterMagicDefense} from "../../shared/constants/constants";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDefensesComponent implements OnInit, OnChanges {


  @Input() physicalDefense: PhysicalDefense;
  @Input() attributes: StartingCharacterAttributes;
  @Input() magicDefense: StartingCharacterMagicDefense;
  @Input() magicDefenseBonus: MagicDefenseType;
  @Input() themePoints: ThemePointsContainer;

  constructor(private ref: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

  ngOnChanges(change) {
    console.log("This is the change: ", change);
    for (const prop of Object.keys(change)) {
      console.log(" is the prop: ", prop);
      if (this[prop]) {
        this[prop] = null;
        this[prop] = change[prop].currentValue;
      }
    }
    this.ref.detectChanges();
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
    if (this.magicDefenseBonus === magicDefenseType) {
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
