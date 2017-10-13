import { Field } from './field';
import {Precision} from "./precision.enum";

describe('Field', () => {
  let ff;
  beforeEach(() => {
    ff = Field;
  });

  it('should create an instance', () => {
    expect(new Field(0)).toBeTruthy();
  });

  it('testing construction of the field class', function () {
    const item = new ff();
    expect(item).toBeDefined();
  });

  it('should sum two values together and equal the correct result', function () {
    const weaponBonus = new ff(0);
    weaponBonus.add['skill'] = 3;
    weaponBonus.add['talent'] = 3;
    expect(weaponBonus.value()).toEqual(6);
    weaponBonus.replace['buff'] = 1;
    expect(weaponBonus.value()).toEqual(7);
    weaponBonus.replace['buff'] = -1;
    expect(weaponBonus.value()).toEqual(5);
  });

  it('should multiple numbers before adding them... whatever that means', function () {
    let attackBonus = new ff(0);
    attackBonus.preMultiply['stud'] = 3;
    attackBonus.add['regularAttack'] = 2;
    expect(attackBonus.value()).toEqual(2);
    attackBonus = new ff(3);
    attackBonus.preMultiply['score'] = 3;
    expect(attackBonus.value()).toEqual(9);
  });

  it('should multiple numbers after adding them', function () {
    const bonus = new ff(2);
    bonus.postMultiply['swordSkill'] = 2;
    bonus.add['strength'] = 6;
    bonus.add['race'] = 2;
    expect(bonus.value()).toEqual(20);
  });

  it('should remember if a value was intended to be multipled or added', function () {
    const bonus = new ff(3);
    bonus.preMultiply['missile'] = 2;
    bonus.add['fast'] = 3;
    bonus.replace['missile'] = 3;
    expect(bonus.value()).toEqual(9);
    bonus.preMultiply['missile'] = 3;
    expect(bonus.value()).toEqual(12);
  });

  it('should use half multiple to multiply numbers by 1/2 the given number', function () {
    const bonus = new ff(3);
    bonus.postMultiply["sword"] = 3;
    bonus.add["cloak"] = 5;
    expect(bonus.value()).toEqual(24);

  });

  it('should be able to return a value with varying degrees of precision', function () {
    const bonus = new ff(50.565);
    expect(bonus.value(0, Precision.OneHalf)).toEqual(50.5);
    expect(bonus.value(0, Precision.OneFourth)).toEqual(50.5);
    expect(bonus.value(0, Precision.Percentile)).toEqual(50.56);
    bonus.add['cool'] = 10.5;
    expect(bonus.value()).toEqual(61);

  });

  it('should be able to get a value for just a specific category... hopefully', function () {
    const bonus = new ff(0);
    bonus.add["item"] = 3;
    expect(bonus.add["item"]).toBe(3);
  });

  it('should prove that filters work', function () {
    const bonus = new ff(3);
    bonus.add['ui'] = 4;
    bonus.add['sword'] = 6;
    expect(bonus.value('ui')).toEqual(3 + 4);

    bonus.replace['ui'] = 10;

    expect(bonus.value('ui')).toEqual(10 + 4); // seems confusing as hell, this changes the original variable value without affecting any other add or things... but whatever

    bonus.preMultiply['ninja'] = 2;
    expect(bonus.value('ninja')).toEqual(6);

    bonus.postMultiply['two'] = 8;
    expect(bonus.value('two')).toEqual(24);


  });

  it('should be able to detect ui changes when they are made by the ui', function () {
    const bonus = new ff(10);
    bonus.add['item1'] = 8;
    bonus.add['item1'] = 4; // overwrite the previous add, works
    expect(bonus.value()).toEqual(14);

    bonus.add['ui'] = 14;
    expect(bonus.isDifferentFrom('ui')).toBeTruthy();

    bonus.add['ui'] = 0;
    expect(bonus.isDifferentFrom('ui')).toBeFalsy();
  });

  it('should be able to produce a simple looking GUID', function () {
    const item = new ff(0).newGUID();
    expect(item.length).toEqual('xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.length);
  });

  it('should be able to clear out a property, cause like that\'s important for resetting shit', function () {
    const item = new ff(3);
    item.add['crap'] = 4;
    item.add['moreCrap'] = 5;
    expect(item.value()).toEqual(12);
    item.clear('add');
    expect(item.value()).toEqual(3);
  });

  it('should be able to clear all properties', function () {
    const item = new ff(3);
    item.add['crap'] = 2;
    item.replace['stuff'] = 5;
    item.preMultiply['uber'] = 4;
    item.postMultiply['i am cool'] = 12;
    expect(item.value()).toEqual(264);
    item.clearAll();
    expect(item.value()).toEqual(3);
  });

  it('shoudld be able to handle strings... maybe', function () {
    const item = new ff("bob");
    expect(item.baseValue).toBe("bob");
    item.defaultValue = "bobmoe";
    expect(item.defaultValue).toBe("bobmoe");

    expect(item.value()).toBe("bob");
  });


});
