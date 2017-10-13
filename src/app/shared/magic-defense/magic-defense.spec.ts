import {MagicDefense} from './magic-defense';
import {MagicDefenseType} from "./magic-defense-type.enum";
import {Field} from "../field";

describe('MagicDefense', () => {
  it('should create an instance', () => {
    expect(new MagicDefense(MagicDefenseType.Fortitude, new Field(0))).toBeTruthy();
  });
});
