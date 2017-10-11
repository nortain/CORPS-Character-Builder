import {Attribute} from "./attribute";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeType} from "./attribute-type.enum";

export class Brawn extends Attribute {

  heavyDamage = [0, 3, 6, 7, 8];
  balanceDamage = [0, 2, 4, 5, 6];
  brawnBonus = [0, 2, 3, 3, 4];
  epicLevelBonusText = "";
  forcedMovementResistance = [0, 0, 0, 1, 1];

  constructor(strength: AttributeStrength, type: AttributeType) {
    super("Brawn", strength, AttributeType.PhysicalOffensive);
  }

  getHeavyDamage(): number {
    return this.heavyDamage[this.strength];
  }

  getBalanceDamage(): number {
    return this.balanceDamage[this.strength];
  }

  getBrawnBonus(): number {
    return this.brawnBonus[this.strength];
  }

  getForcedMovementResistance(): number {
    return this.forcedMovementResistance[this.strength];
  }


}
