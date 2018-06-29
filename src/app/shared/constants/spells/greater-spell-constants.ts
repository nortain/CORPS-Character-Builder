import {Spell, SpellEffect, SpellEffectType} from "../../spells/spell";
import {SpellKeyword} from "../../spells/enums/spell-keywords.enum";
import {AreaOfEffectType} from "../../area-of-effect/area-of-effect-type.enum";
import {ActionType} from "../../action/action-type.enum";
import {DurationType} from "../../duration/duration-type.enum";
import {LevelRange} from "../../spells/enums/level-range.enum";
import {DiceSize} from "../../character/dice/dice-size.enum";

import {SpellType} from "../../spells/enums/spell-type.enum";
import {SpellChart} from "../../spells/spell-chart";

export function ShamanSpellList(): Spell[] {
  return [
    {
      ...new Spell(),
      name: "Healing Winds",
      spellType: SpellType.FriendlyUtility,
      spellKeywords: [SpellKeyword.Regeneration, SpellKeyword.FriendlyMovement],
      areaOfEffect: {
        numberOfTargets: 1,
        range: 1,
        type: AreaOfEffectType.Ranged
      },
      castAction: ActionType.Deliberate,
      duration: [DurationType.Immediate],
      spellEffectText: [
        {
          type: SpellEffectType.SpellEffect,
          text: "You can grant regeneration equal to the regeneration table below to a friendly target or yourself.  " +
          "You can then slide that target a number of squares equal to the slide distance.  As a swift action make an implement attack.",
          spellChart:
            [
              {
                ...new SpellChart(),
                rowName: "Regeneration",
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.None,
                minValue: 4,
                maxValue: 18
              },
              {
                ...new SpellChart(),
                levelRange: LevelRange.FIFTHTEEN,
                dieSize: DiceSize.None,
                minValue: 1,
                maxValue: 4
              }
            ]
        }
      ]
    }
  ];
}
