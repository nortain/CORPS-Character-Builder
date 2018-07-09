import {SpellDamageKeyword} from "./enums/spell-damage-keyword.enum";
import {SpellKeyword} from "./enums/spell-keywords.enum";

export class DamageKeywordModifier {
  minAdj: number;
  maxAdj: number;
  staticDieMod: number;
  critMod: number;
  isMinion: boolean;

  constructor(damageKeyword: SpellDamageKeyword | SpellKeyword) {
    this.minAdj = 0;
    this.maxAdj = 0;
    this.staticDieMod = 0;
    this.critMod = 0;
    this.isMinion = false;
    this.assignValues(damageKeyword);
  }

  assignValues(damageKeyword: SpellDamageKeyword | SpellKeyword) {
    switch (damageKeyword) {
      case SpellDamageKeyword.Wild:
        this.maxAdj = -1;
        break;
      case SpellDamageKeyword.Acid:
        this.staticDieMod = -1;
        break;
      case SpellDamageKeyword.Poison:
        this.minAdj = 1;
        this.maxAdj = 3;
        this.critMod = -2;
        break;
      case SpellDamageKeyword.Psychic:
        this.minAdj = 1;
        this.maxAdj = 1;
        this.critMod = -1;
        break;
      case SpellDamageKeyword.Force:
        this.minAdj = 1;
        this.maxAdj = 1;
        this.staticDieMod = 2;
        break;
      case SpellDamageKeyword.Heat:
        this.maxAdj = -2;
        this.critMod = 2;
        break;
      case SpellKeyword.Implement:
        this.staticDieMod = -3;
        break;
      case SpellDamageKeyword.Cold:
        this.staticDieMod = 2;
        this.maxAdj = 1;
        break;
      case SpellKeyword.Minion:
        this.isMinion = true;
        break;
      default:
        break;
    }
  }
}
