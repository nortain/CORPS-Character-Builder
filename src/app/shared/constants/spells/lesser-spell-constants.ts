import {Spell, SpellEffectType} from "../../spells/spell";
import {AllDefenseType, PhysicalDefenseType} from "../../character/physical-defense/physical-defense-type.enum";
import {SpellKeyword} from "../../spells/enums/spell-keywords.enum";

import {AreaOfEffect} from "../../area-of-effect/area-of-effect";
import {AreaOfEffectTypes} from "../../area-of-effect/area-of-effect-types.enum";
import {ActionType} from "../../action/action-type.enum";
import {DurationType} from "../../duration/duration-type.enum";
import {Dice} from "../../character/dice/dice";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {DiceSize} from "../../character/dice/dice-size.enum";
import {SpellChart} from "../../spells/spell-chart";
import {SpellType} from "../../spells/enums/spell-type.enum";
import {SpellDamageKeyword} from "../../spells/enums/spell-damage-keyword.enum";

export function ClericBlessings(): Spell[] {
  return [{
    ...new Spell(),
    name: "Blessing of the Holy",
    spellType: SpellType.FriendlyUtility,
    spellKeywords: [SpellKeyword.Healing],
    areaOfEffect: {
      numberOfTargets: 1,
      range: 10,
      type: AreaOfEffectTypes.Burst
    },
    castAction: ActionType.Minor,
    duration: [DurationType.Immediate],
    special: ["You must have 2 or more blessings to activate this ability"],
    spellEffectText: [
      {
        type: SpellEffectType.SpellEffect,
        text: "Spend all of your blessings to heal a friendly creature within range for a number of hit points equal to the healing chart below per blessing spent. They may also choose to spend a recovery to gain additional hit points",
        spellChart: [
          {
            ...new SpellChart(),
            rowName: SpellKeyword.Healing,
            levelRange: LevelRange.TEN,
            dieSize: DiceSize.None,
            minValue: 2,
            maxValue: 6
          }
        ]
      }
    ]
  }, {
    ...new Spell(),
    name: "Blessing of the Stalwart",
    spellType: SpellType.DirectEffect,
    spellKeywords: [SpellKeyword.ForcedMovement],
    damageKeyword: SpellDamageKeyword.Radiant,
    areaOfEffect: {
      numberOfTargets: 1,
      range: 10,
      type: AreaOfEffectTypes.Burst
    },
    castAction: ActionType.Minor,
    duration: [DurationType.Immediate],
    special: ["You must have 2 or more blessings to activate this ability"],
    spellEffectText: [
      {
        type: SpellEffectType.SpellEffect,
        text: "Spend all of your blessings to an enemy creature take radiant damage equal to the damage chart below per blessing spent.  If the creature is also adjacent to a friendly creature other than yourself you can slide them 1 square",
        spellChart: [
          {
            ...new SpellChart(),
            rowName: SpellDamageKeyword.Radiant,
            levelRange: LevelRange.TEN,
            dieSize: DiceSize.None,
            minValue: 3.33,
            maxValue: 9.99
          }
        ]
      }
    ]
  }];
}

export function ClericSpellList(): Spell[] {
  return [{
    ...new Spell(),
    name: "Fierce Devotion",
    defenseType: [AllDefenseType.Missile],
    spellType: SpellType.DirectEffect,
    spellKeywords: [SpellKeyword.Concentration],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: {
      numberOfTargets: 1,
      range: 10,
      type: AreaOfEffectTypes.Ranged
    },
    castAction: ActionType.Standard,
    critRoll: new Dice(1, DiceSize.d10, 2),
    duration: [DurationType.Immediate, DurationType.Concentration],
    spellEffectText: [
      {
        type: SpellEffectType.OnHit,
        text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
        spellChart: [
          {
            ...new SpellChart(),
            rowName: SpellDamageKeyword.Wild,
            levelRange: LevelRange.FIFTHTEEN,
            dieSize: DiceSize.d8,
            minValue: 13.33,
            maxValue: 53.74
          }
        ]
      }, {
        type: SpellEffectType.AfterEffect,
        text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
        spellChart: [
          {
            ...new SpellChart(),
            rowName: SpellKeyword.Concentration,
            levelRange: LevelRange.FIFTHTEEN,
            dieSize: DiceSize.None,
            minValue: 10.38,
            maxValue: 34.81
          }
        ]
      }
    ]
  }];
}

export function DruidSpellList(): Spell[] {
  return [{
    ...new Spell(),
    name: "Fierce Devotion",
    defenseType: [AllDefenseType.Missile],
    spellType: SpellType.DirectEffect,
    spellKeywords: [SpellKeyword.Concentration],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: {
      numberOfTargets: 1,
      range: 1,
      type: AreaOfEffectTypes.Ranged
    },
    castAction: ActionType.Standard,
    critRoll: new Dice(1, DiceSize.d10, 2),
    duration: [DurationType.Immediate, DurationType.Concentration],
    spellEffectText: [{
      type: SpellEffectType.OnHit,
      text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
      spellChart: [{
        ...new SpellChart(),
        rowName: SpellDamageKeyword.Wild,
        levelRange: LevelRange.FIFTHTEEN,
        dieSize: DiceSize.d8,
        minValue: 13.33,
        maxValue: 53.74
      },
        {
          ...new SpellChart(),
          rowName: SpellKeyword.Concentration,
          levelRange: LevelRange.FIFTHTEEN,
          dieSize: DiceSize.None,
          minValue: 10.38,
          maxValue: 34.81
        }]
    }, {
      type: SpellEffectType.AfterEffect,
      text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
    }],
  }];
}

export function AssassinSpellList(): Spell[] {
  return [{
    ...new Spell(),
    name: "Fierce Devotion",
    defenseType: [AllDefenseType.Missile],
    spellType: SpellType.DirectEffect,
    spellKeywords: [SpellKeyword.Concentration],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: {
      numberOfTargets: 1,
      range: 1,
      type: AreaOfEffectTypes.Ranged
    },
    castAction: ActionType.Standard,
    critRoll: new Dice(1, DiceSize.d10, 2),
    duration: [DurationType.Immediate, DurationType.Concentration],
    spellEffectText: [{
      type: SpellEffectType.OnHit,
      text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
      spellChart: [{
        ...new SpellChart(),
        rowName: SpellDamageKeyword.Wild,
        levelRange: LevelRange.FIFTHTEEN,
        dieSize: DiceSize.d8,
        minValue: 13.33,
        maxValue: 53.74
      },
        {
          ...new SpellChart(),
          rowName: SpellKeyword.Concentration,
          levelRange: LevelRange.FIFTHTEEN,
          dieSize: DiceSize.None,
          minValue: 10.38,
          maxValue: 34.81
        }]
    }, {
      type: SpellEffectType.AfterEffect,
      text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
    }]
  }];
}

export function WarriorMageSpellList(): Spell[] {
  return [{
    ...new Spell(),
    name: "Fierce Devotion",
    defenseType: [AllDefenseType.Missile],
    spellType: SpellType.DirectEffect,
    spellKeywords: [SpellKeyword.Concentration],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: {
      numberOfTargets: 1,
      range: 1,
      type: AreaOfEffectTypes.Ranged
    },
    castAction: ActionType.Standard,
    critRoll: new Dice(1, DiceSize.d10, 2),
    duration: [DurationType.Immediate, DurationType.Concentration],
    spellEffectText: [{
      type: SpellEffectType.OnHit,
      text: "Target takes wild damage equal to the attack table below + magical attack bonus.  The target also gains the devotion effect that lasts so long as you maintain concentration.  At the start of your next turn after you cast this spell you must spend your move action to maintain concentration or this spell’s effect is removed.  You may only have 1 concentration effect active at a time.",
      spellChart: [{
        ...new SpellChart(),
        rowName: SpellDamageKeyword.Wild,
        levelRange: LevelRange.FIFTHTEEN,
        dieSize: DiceSize.d8,
        minValue: 13.33,
        maxValue: 53.74
      },
        {
          ...new SpellChart(),
          rowName: SpellKeyword.Concentration,
          levelRange: LevelRange.FIFTHTEEN,
          dieSize: DiceSize.None,
          minValue: 10.38,
          maxValue: 34.81
        }]
    }, {
      type: SpellEffectType.AfterEffect,
      text: "Each time you pay the concentration cost of this spell the target with the devotion effect takes wild damage equal to the concentration table’s damage value below + global damage bonus",
    }]
  }];
}
