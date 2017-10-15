import {WeaponCategory} from "./weapon-category.enum";
import {WeaponType} from "./weapon-type";
import {BASE_WEAPON_DAMAGE} from "../constants";
import {WeaponClass} from "./weapon-class.enum";
import {Dice} from "../character/dice";

export class Weapon {
  baseValues: WeaponType;

  constructor(public name: string, weaponClass: WeaponClass, category: WeaponCategory) {
    this.baseValues = BASE_WEAPON_DAMAGE[category][weaponClass];
    this.baseValues.category = category;
    this.baseValues.weaponClass = weaponClass;
    this.setRemainingValues();
  }

  private setRemainingValues() {
    if (!this.baseValues.attack) {
      this.baseValues.attack = new Dice(2, 12, 3);
    }
    if (!this.baseValues.range) {
      this.baseValues.range = [];
    }
    if (!this.baseValues.specialText) {
      this.baseValues.specialText = "";
    }
  }
}
