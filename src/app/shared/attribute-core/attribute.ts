import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeName} from "./attribute-name.enum";
import {SpecialText} from "./special-text.enum";

export class Attribute {
  private epicText;
  private legendaryText;
  primaryPhysicalDamage = [0, 3, 6, 7, 8];
  secondayPhysicalDamage = [0, 2, 4, 5, 6];
  skillBonus = [0, 2, 3, 3, 4];
  magicDefense = [0, 2, 3, 3, 3];
  type: AttributeType;

  constructor(protected name: AttributeName, public strength: AttributeStrength) {
    this.assignType(name);
  }

  getName(): AttributeName {
    return this.name;
  }

  getSkillBonus(): number {
    if (this.hasSkillBonus()) {
      return this.skillBonus[this.strength];
    } else {
      return 0;
    }
  }


  getMagicDefense(): number {
    if (this.name === AttributeName.Intuition) {
      return this.magicDefense[this.strength] - 1;
    } else if (this.hasMagicDefense()) {
      return this.magicDefense[this.strength];
    } else {
      return 0;
    }
  }

  getPrimaryDamage(): number {
    if (this.hasDamageBonus()) {
      return this.primaryPhysicalDamage[this.strength];
    } else {
      return 0;
    }

  }

  getSecondaryDamage(): number {
    if (this.hasDamageBonus()) {
      return this.secondayPhysicalDamage[this.strength];
    } else {
      return 0;
    }

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

  hasDamageBonus(): boolean {
    return this.type === AttributeType.PhysicalOffensive || this.type === AttributeType.MentalOffensive;
  }

  hasMagicDefense(): boolean {
    return this.type === AttributeType.PhysicalDefensive || this.type === AttributeType.MentalDefensive;
  }

  /*Return the skill bonus for the given attribute*/
  hasSkillBonus(): boolean {
    return this.type === AttributeType.MentalOffensive
      || this.type === AttributeType.PhysicalOffensive
      || this.name === AttributeName.Intuition;
  }


  getSpecialText(): string {
    return this.getEpicText() + this.getLegendaryText();
  }

  /*responsible for assigned the special text and attributeType based on the name of the attribute*/
  private assignType(name) {
    switch (name) {
      case AttributeName.Brawn:
      case AttributeName.Agility:
        this.type = AttributeType.PhysicalOffensive;
        break;
      case AttributeName.Intuition:
      case AttributeName.SelfDiscipline:
        this.type = AttributeType.MentalDefensive;
        break;
      case AttributeName.Quickness:
      case AttributeName.Vitality:
        this.type = AttributeType.PhysicalDefensive;
        break;
      case AttributeName.Reasoning:
      case AttributeName.Presence:
        this.type = AttributeType.MentalOffensive;
        break;
      default:
        throw new Error("Invalid attribute was created!");
    }
    this.epicText = SpecialText[name.toString().trim() + "EpicText"];
    this.legendaryText = SpecialText[name.toString().trim() + "LegendaryText"];
  }

  private getEpicText(): string {
    if (this.strength > AttributeStrength.Champion) {
      return this.epicText;
    } else {
      return '';
    }
  }

  private getLegendaryText(): string {
    if (this.strength === AttributeStrength.Legendary) {
      return this.legendaryText;
    } else {
      return '';
    }
  }


}
