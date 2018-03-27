import {MagicDefenseType} from "./magic-defense-type.enum";
import {Field} from "../../../field/field";


export class MagicDefense {
  constructor(private type: MagicDefenseType, private strength: Field) {
    if (strength.value() < 10) {
      this.strength = new Field(10);
    }
  }

  addDefenseBonus(name: string, value: number) {
    this.strength.addVal[name] = value;
  }

  removeDefenseBonus(name?: string) {
    if (!name) {
      this.strength.clearAll();
    } else if (this.strength.value(name)) {
      this.strength.addVal[name] = 0;
    }
  }

  getDefense(): number {
    return this.strength.value();
  }
}
