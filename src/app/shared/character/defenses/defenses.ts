

import {ACTIVE_DEFENSE, PASSIVE_DEFENSE, StartingCharacterMagicDefense} from "../../constants/constants";
import {PhysicalDefenseType} from "./physical-defense-type.enum";
import {Field} from "../../field/field";

export class Defenses {





  constructor(public activeDefenses = <PhysicalDefenseType[]>[],
              public activeDefense = new Field(ACTIVE_DEFENSE[0]),
              public passiveDefenses = <PhysicalDefenseType[]>[
                PhysicalDefenseType.Line,
                PhysicalDefenseType.Missile,
                PhysicalDefenseType.Unarmed,
                PhysicalDefenseType.Zone],
              public passiveDefense = new Field(PASSIVE_DEFENSE[0]),
              public magicalDefenses = new StartingCharacterMagicDefense()) {
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

  getPassiveDefensiveValue() {
    return this.passiveDefense.value();
  }

  getActiveDefensiveValue() {
    return this.activeDefense.value();
  }
}
