import {Attribute} from "./attribute";
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";

describe('Testing attribute class', () => {

  let attribute: Attribute;

  beforeEach(() => {
    attribute = makeAttribute();
  });


  it('should make the attribute class', () => {
    expect(attribute).toBeDefined();
  });

  it('attribute can have a name', () => {
    expect(attribute.name).toEqual(AttributeName.Brawn);
  });

  it('should have strength 0 by default', () => {
    expect(attribute.strength).toEqual(AttributeStrength.Normal);
  });


});

function makeAttribute(name?: AttributeName, strength?: AttributeStrength): Attribute {
  if (!name) {
    name = AttributeName.Brawn;
  }
  if (!strength) {
    strength = AttributeStrength.Normal;
  }
  return new Attribute(name, strength);
}
