import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {AttributeName} from "./attribute-name.enum";
import {SpecialText} from "./special-text.enum";
import {
  HP_SCALING_FACTOR, IN_THP_BONUS, Level, MAGIC_DEFENSE, PRIMARY_DAMAGE, QU_HP_BONUS, ROUNDING_VALUE, SD_HP_BONUS, SECONDARY_DAMAGE,
  SKILL_BONUS, VI_HP_BONUS
} from "../constants";


export class Attribute {
  private epicText: string;
  private legendaryText: string;
  type: AttributeType;

  constructor(protected name: AttributeName, public strength: AttributeStrength) {
    this.assignType(name);
  }

  getName(): AttributeName {
    return this.name;
  }

  getSkillBonus(): number {
    if (this.hasSkillBonus()) {
      return SKILL_BONUS[this.strength];
    } else {
      return 0;
    }
  }


  getMagicDefense(): number {
    if (this.name === AttributeName.Intuition) {
      return MAGIC_DEFENSE[this.strength] - 1;
    } else if (this.hasMagicDefense()) {
      return MAGIC_DEFENSE[this.strength];
    } else {
      return 0;
    }
  }

  getPrimaryDamage(): number {
    if (this.hasDamageBonus()) {
      return PRIMARY_DAMAGE[this.strength];
    } else {
      return 0;
    }

  }

  getSecondaryDamage(): number {
    if (this.hasDamageBonus()) {
      return SECONDARY_DAMAGE[this.strength];
    } else {
      return 0;
    }

  }

  /*Given a level this finds how many bonus hit points an attribute gives based on its strength*/
  getBonusHitPoints(level: number): number {
    if (this.hasHpBonus()) {
      if (this.name === AttributeName.Vitality) {
        return VI_HP_BONUS[level][this.strength];
      } else if (this.name === AttributeName.Quickness) {
        return QU_HP_BONUS[level][this.strength];
      } else {// assumes SelfDiscipline
        return SD_HP_BONUS[level][this.strength];
      }
    } else {
      return 0;
    }
  }

  getBonusTemporaryHitPoints(level: number): number {
    if (this.hasThpBonus()) {
      return IN_THP_BONUS[level][this.strength];
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

  /*Return true if this attribute gives a bonus to hp*/
  hasHpBonus(): boolean {
    return this.type === AttributeType.PhysicalDefensive || this.name === AttributeName.SelfDiscipline;
  }

  hasThpBonus(): boolean {
    return this.name === AttributeName.Intuition;
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
