import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeName} from "./attribute-name.enum";

export class Attribute {

  primaryPhysicalDamage = [0, 3, 6, 7, 8];
  secondayPhysicalDamage = [0, 2, 4, 5, 6];
  brawnBonus = [0, 2, 3, 3, 4];
  forcedMovementResistance = [0, 0, 0, 1, 1];
  type: AttributeType;

  constructor(public name: AttributeName, public strength: AttributeStrength) {
    switch (name) {
      case AttributeName.Brawn || AttributeName.Agility: this.type = AttributeType.PhysicalOffensive; break;
      case AttributeName.Intuition || AttributeName.SelfDiscipline: this.type = AttributeType.MentalDefensive; break;
      case AttributeName.Quickness || AttributeName.Vitality: this.type = AttributeType.PhysicalDefensive; break;
      case AttributeName.Reasoning || AttributeName.Presence: this.type = AttributeType.MentalOffensive; break;
      default: throw Error("Invalid attribute was created!");

    }
  }

  getSkillBonus() {

  }

  getPrimaryPhysicalDamage(): number {
    return this.primaryPhysicalDamage[this.strength];
  }

  getSecondaryPhysicalDamage(): number {
    return this.secondayPhysicalDamage[this.strength];
  }

  getForcedMovementResistance(): number {
    return this.forcedMovementResistance[this.strength];
  }

  getBonusCriticalDice(level: number): number {
    if (this.strength < AttributeStrength.Legendary
      || this.type === AttributeType.MentalDefensive
      || this.type === AttributeType.PhysicalDefensive) {
      return 0;
    } else {
      if (level === 10) {
        return 3;
      } else if (level > 5) {
        return 2;
      } else {
        return 1;
      }
    }
  }

  /*Return the skill bonus for the given attribute*/
  hasSkillBonus(): boolean {
    if (this.type === AttributeType.MentalOffensive
      || this.type === AttributeType.PhysicalOffensive
      || this.name === AttributeName.Intuition) {
      return true;
    } else {
      return false;
    }
  }


}
