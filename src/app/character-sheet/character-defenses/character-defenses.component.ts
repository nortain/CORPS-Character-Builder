import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange} from '@angular/core';
import {Character} from "../../shared/character/character";
import {AttributeBonus} from "../../shared/attribute/character-attribute/attribute-bonus.enum";
import {MagicDefenseType} from "../../shared/character/magic-defense/magic-defense-type.enum";
import {PhysicalDefense} from "../../shared/character/phsyical-defense/physical-defense";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterDefensesComponent implements OnInit, OnChanges {

  @Input() character: Character;

  constructor() {
  }

  ngOnInit() {
    console.log("This is the character", this.character);
    if (!this.character.physicalDefense) {
      this.character.physicalDefense = new PhysicalDefense();
    }
  }

  ngOnChanges(change){
    console.log("This is the change: ", change);
    console.log("This is the character: ", this.character);
    this.cloneCharacter();
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
    this.character = null;
    this.character = newChar;
  }


}
