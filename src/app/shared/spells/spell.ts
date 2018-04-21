import {Dice} from "../character/dice/dice";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {PhysicalDefenseType} from "../character/phsyical-defense/physical-defense-type.enum";
import {SpellTypes} from "./spell-types";
import {SpellDamageKeywords} from "./spell-damage-keywords.enum";
import {SpellKeywords} from "./spell-keywords.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";


export class Spell {
  name: string;
  defenseType: MagicDefenseType | PhysicalDefenseType | "Active" | "Passive";
  spellType: SpellTypes;
  spellKeywords: SpellKeywords[];
  damageKeywords: SpellDamageKeywords[];
  areaOfEffect: AreaOfEffect;
  castAction: ActionType;
  duration: DurationTypes[];
  critRoll: Dice;
  special: string[];
  minion: Minion;
  spellEffectText: string;
  damageArray: { name: string, rowNames: string[], values: Dice[] }[];
  afterEffect: string;
}
