import {Attribute} from "./attribute";
import {AttributeName} from "./attribute-name.enum";
import {AttributeStrength} from "./attribute-strength.enum";
import {SpecialText} from "./special-text.enum";

describe('Testing attribute class', () => {

  let attribute: Attribute;
  let bra, vit, rea, sd, int, qu;

  beforeEach(() => {
    attribute = makeAttribute();
    bra = makeAttribute(AttributeName.Brawn, AttributeStrength.Legendary);
    vit = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
    rea = makeAttribute(AttributeName.Reasoning, AttributeStrength.Legendary);
    sd = makeAttribute(AttributeName.SelfDiscipline, AttributeStrength.Legendary);
    int = makeAttribute(AttributeName.Intuition, AttributeStrength.Legendary);
    qu = makeAttribute(AttributeName.Quickness, AttributeStrength.Legendary);
  });


  it('should make the attribute class', () => {
    expect(attribute).toBeDefined();
  });

  it('should encounter an error', () => {
    try {
      const item = new Attribute(null, AttributeStrength.Legendary);
      expect(false).toBeTruthy();
    } catch (err) {
      expect(true).toBeTruthy();
    }
  });

  it('attribute can have a name', () => {
    expect(attribute.getName()).toEqual(AttributeName.Brawn);
  });

  it('should have strength 0 by default', () => {
    expect(attribute.strength).toEqual(AttributeStrength.Normal);
  });

  it('should confirm that certain attributes give a skill bonus while others do not', () => {
    const vitality = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
    expect(vitality.hasSkillBonus()).toBeFalsy();
  });

  it('should be able to get skill bonus', () => {
    expect(attribute.getSkillBonus()).toEqual(0);
  });

  it('should be able to get skill bonus heroic brawn', () => {
    attribute = makeAttribute(AttributeName.Brawn, AttributeStrength.Heroic);
    expect(attribute.getSkillBonus()).toEqual(2);
  });

  it('should have skill bonus of 4 with legendary brawn but 0 with legendary vitality', () => {
    attribute = makeAttribute(AttributeName.Brawn, AttributeStrength.Legendary);
    expect(attribute.getSkillBonus()).toEqual(4);
    attribute = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
    expect(attribute.getSkillBonus()).toEqual(0);
  });

  it('should be able to determine if an attribute is defensive', () => {
    expect(attribute.getMagicDefense()).toBeFalsy();
  });

  it('should be able to get magic defense for attributes that have magic defense', () => {
    attribute = makeAttribute(AttributeName.Vitality, AttributeStrength.Legendary);
    expect(attribute.getMagicDefense()).toEqual(3);
    attribute = makeAttribute(AttributeName.Intuition, AttributeStrength.Legendary);
    expect(attribute.getMagicDefense()).toEqual(2);
  });

  it('should be able to get primary damage for legendary brawn', () => {
    expect(bra.getPrimaryDamage()).toEqual(8);
  });

  it('should be able to get secondary damage for legendary brawn', () => {
    expect(bra.getSecondaryDamage()).toEqual(6);
  });

  it('should be able to determine which attributes are defensive and which are offensive', () => {
    expect(vit.hasDamageBonus()).toBeFalsy();
    expect(bra.hasDamageBonus()).toBeTruthy();
  });

  it('should show that a defensive stat does not get a damage bonus', () => {
    expect(vit.hasDamageBonus()).toBeFalsy();
    expect(vit.getPrimaryDamage()).toEqual(0);
    expect(vit.getSecondaryDamage()).toEqual(0);
  });

  it('should show bonus critical dice for legendary offensive attributes only', () => {
    expect(bra.getBonusCriticalDice(1)).toEqual(1);
    expect(attribute.getBonusCriticalDice(1)).toEqual(0);
    expect(vit.getBonusCriticalDice(1)).toEqual(0);
    expect(bra.getBonusCriticalDice(10)).toEqual(3);
    expect(bra.getBonusCriticalDice(6)).toEqual(2);
  });

  it('should be able to get special text for an attribute', () => {
    expect(attribute.getSpecialText()).toBe('');
    expect(bra.getSpecialText()).toBe(SpecialText.BrawnEpicText.toString() + SpecialText.BrawnLegendaryText.toString());
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
