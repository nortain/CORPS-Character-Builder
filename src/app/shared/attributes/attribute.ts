import {AttributeType} from "./attribute-type.enum";
import {AttributeStrength} from "./attribute-strength.enum";

export class Attribute {

  constructor(protected name: string, public strength: AttributeStrength, type: AttributeType) {}

}
