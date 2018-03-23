import {AttributeStrength} from "../attribute-strength.enum";
import {AttributeName} from "../attribute-name.enum";
import {Attribute} from "../attribute";
import {AttributeBonus} from "./attribute-bonus.enum";

export class StartingCharacterAttributes {
  Brawn: Attribute;
  Vitality: Attribute;
  Agility: Attribute;
  Quickness: Attribute;
  Presence: Attribute;
  Intuition: Attribute;
  Reasoning: Attribute;
  SelfDiscipline: Attribute;
  attributesArray;

  constructor() {
    this.Brawn = new Attribute(AttributeName.Brawn, AttributeStrength.Normal);
    this.Vitality = new Attribute(AttributeName.Vitality, AttributeStrength.Normal);
    this.Agility = new Attribute(AttributeName.Agility, AttributeStrength.Normal);
    this.Quickness = new Attribute(AttributeName.Quickness, AttributeStrength.Normal);
    this.Presence = new Attribute(AttributeName.Presence, AttributeStrength.Normal);
    this.Intuition = new Attribute(AttributeName.Intuition, AttributeStrength.Normal);
    this.Reasoning = new Attribute(AttributeName.Reasoning, AttributeStrength.Normal);
    this.SelfDiscipline = new Attribute(AttributeName.SelfDiscipline, AttributeStrength.Normal);
    this.attributesArray = [
      this.Brawn,
      this.Vitality,
      this.Agility,
      this.Quickness,
      this.Presence,
      this.Intuition,
      this.Reasoning,
      this.SelfDiscipline
    ];
  }


  /**
   * Given a attributeBonus (enum) this will loop through all 8 attributes and sum the bonus of each and return the final result
   * @param {AttributeBonus} functionName
   * @returns {number} the bonus of whatever type of attribute bonus is selected
   */
  getBonus(functionName: AttributeBonus): number {
    let result = 0;
    for (const att of this.attributesArray) {
      result += att[functionName]();
    }
    return result;
  }
}
