import {ACTIVE_DEFENSE, PASSIVE_DEFENSE, StartingCharacterMagicDefense} from "../../constants/constants";
import {PhysicalDefenseType} from "./physical-defense-type.enum";
import {Field} from "../../field/field";
import {Armor} from "../../armor/armor";
import {ArmorType} from "../../armor/armor-type.enum";

export class Defense {

  activeDefenseBonus: Field;
  passiveDefenseBonus: Field;

  constructor(public armor: Armor = new Armor(ArmorType.None),
              public activeDefenses = <PhysicalDefenseType[]>[],
              public passiveDefenses = <PhysicalDefenseType[]>[
                PhysicalDefenseType.Line,
                PhysicalDefenseType.Missile,
                PhysicalDefenseType.Unarmed,
                PhysicalDefenseType.Zone],
              public magicalDefenses = new StartingCharacterMagicDefense()) {
    this.activeDefenseBonus = new Field(0);
    this.passiveDefenseBonus = new Field(0);
  }

  moveToActive(defense: PhysicalDefenseType) {
    const index = this.passiveDefenses.indexOf(defense);
    if (index !== -1) {
      this.passiveDefenses.splice(index);
      this.activeDefenses.push(defense);
    }
  }

  moveToPassive(defense: PhysicalDefenseType) {
    const index = this.activeDefenses.indexOf(defense);
    if (index !== -1) {
      this.activeDefenses.splice(index);
      this.passiveDefenses.push(defense);
    }
  }

  /**
   * pass in a string name and a bonus value to set that value to the field object under the given name.  If a bonus needs to be removed just pass in the value of 0 along with the name of the bonus and it'll be set to 0.
   * @param {string} bonusName
   * @param {number} bonusValue
   * @param {boolean} isForAD is to say if we are setting a bonus for active defense or for passive defense
   */
  setBonusForDefense(bonusName: string, bonusValue: number, isForAD: boolean) {
    if (isForAD) {
      this.activeDefenseBonus.addVal[bonusName] = bonusValue;
    } else {
      this.passiveDefenseBonus.addVal[bonusName] = bonusValue;
    }

  }

  getPassiveDefensiveValue() {
    let baseValue = this.armor.getPassiveDefense();
    baseValue += this.passiveDefenseBonus.value();
    return baseValue;
  }

  getActiveDefensiveValue() {
    let baseValue = this.armor.getActiveDefense();
    baseValue += this.activeDefenseBonus.value();
    return baseValue;
  }
}
