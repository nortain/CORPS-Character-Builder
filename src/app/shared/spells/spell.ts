import {Dice} from "../character/dice/dice";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {PhysicalDefenseType} from "../character/phsyical-defense/physical-defense-type.enum";
import {SpellTypesEnum} from "./spell-types";
import {SpellKeywords} from "./spell-keywords.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";
import {ActionType} from "../action/action-type.enum";
import {DurationType} from "../duration/duration-type.enum";
import {Minion} from "../minion/minion";
import {DiceSize} from "../character/dice/dice-size.enum";
import {LevelRange} from "./enums/level-range.enum";
import {SpellChart} from "./spellChart";
import {SpellDamageKeyword} from "./enums/spell-damage-keyword.enum";


export class Spell {
  name: string;
  defenseType: MagicDefenseType | PhysicalDefenseType | "Active" | "Passive";
  spellType: SpellTypesEnum;
  spellKeywords: SpellKeywords[];
  damageKeywords: SpellDamageKeyword;
  areaOfEffect: AreaOfEffect;
  castAction: ActionType;
  duration: DurationType[];
  critRoll: Dice;
  special: string[];
  minion: Minion;
  spellEffectText: string;
  afterEffect: string;
  spellChart: SpellChart[];
}
