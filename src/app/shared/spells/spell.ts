import {Dice} from "../character/dice/dice";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {AllDefenseType, PhysicalDefenseType} from "../character/physical-defense/physical-defense-type.enum";

import {SpellKeyword} from "./enums/spell-keywords.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";
import {ActionType} from "../action/action-type.enum";
import {DurationType} from "../duration/duration-type.enum";
import {SpellDamageKeyword} from "./enums/spell-damage-keyword.enum";
import {SpellType} from "./enums/spell-type.enum";
import {SpellChart} from "./spell-chart";
import {CasterType} from "../theme-points/subthemes/subtheme-type.enum";

export enum SpellEffectType {
  OnHit = "OnHit",
  OnMiss = "OnMiss",
  Bounce = "Bounce",
  SpellEffect = "SpellEffect",
  AfterEffect = "AfterEffect",
  AdrenalinePoint = "AdrenalinePoint",
  PowerPoint = "PowerPoint"

}

export interface SpellEffect {
  type?: SpellEffectType;
  text?: string;
  spellChart?: SpellChart[];
}


export class Spell {
  name: string;
  sphereName: CasterType;
  defenseType?: AllDefenseType[];
  spellType?: SpellType;
  spellKeywords?: SpellKeyword[];
  damageKeyword?: SpellDamageKeyword;
  areaOfEffect?: AreaOfEffect;
  castAction?: ActionType;
  duration?: DurationType[];
  critRoll?: Dice;
  special?: string[];
  spellEffectText?: SpellEffect[];
}
