import {MagicDefenseType} from "./magic-defense-type.enum";
import {Field} from "../field/field";

export class MagicDefense {
  constructor(private type: MagicDefenseType, public strength: Field) { }
}
