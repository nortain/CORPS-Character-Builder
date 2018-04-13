import {MaxMovement} from "../armor/max-movement";
import {WeaponType} from "../weapon/weapon-type";
import {Dice} from "../character/dice/dice";
import {DiceSize} from "../character/dice/dice-size.enum";
import {MagicDefenseType} from "../character/magic-defense/magic-defense-type.enum";
import {Field} from "../field/field";
import {MagicDefense} from "../character/magic-defense/magic-defense";
import {Race} from "../character/race/race";
import {VisionType} from "../character/race/vision-type.enum";
import {AttributeName} from "../attribute/attribute-name.enum";
import {ThemeType} from "../theme-points/theme-type.enum";
import {SavingThrow} from "../character/saving-throw.enum";
import {BonusByLevel} from "../character/bonus-by-level";
import {Bonus} from "../character/bonus";
import {Attribute} from "../attribute/attribute";
import {AttributeStrength} from "../attribute/attribute-strength.enum";


export const NON_HUMAN_AVAILABLE_ATTRIBUTE_POINTS = 4;

export const STARTING_MOVEMENT = 6;
export const STARTING_INITIATIVE = 0;
export const STARTING_HIT_POINTS = 8;
export const STARTING_RECOVERIES = 6;

// Armor constants based off of the ArmorType Enum
export const ACTIVE_DEFENSE = [11, 13, 13, 13, 14];
export const PASSIVE_DEFENSE = [10, 11, 11, 12, 13];
export const CRITICAL_REDUCTION = [0, 0, 1, 2, 3];
export const CASTER_PENALTY = [3, 3, 2, 1, 0];
export const MAX_MOVEMENT: Array<MaxMovement> =
  [
    new MaxMovement(10, 0),
    new MaxMovement(10, 0),
    new MaxMovement(8, 0),
    new MaxMovement(7, 0),
    new MaxMovement(6, -1)
  ];
export const SKILL_PENALTY = [0, 0, 0, 1, 2];
export const REQUIRES_TRAINING = [false, false, false, false, true];
export const REQUIRES_THREE_MAGIC = [false, true, false, false, false];

export const STEALTH_INIT_BONUS = [0, 2, 4, 6];

// Attribute constants based off of the AttributeStrength enum
export const PRIMARY_DAMAGE = [0, 3, 6, 7, 8];
export const SECONDARY_DAMAGE = [0, 2, 4, 5, 6];
export const SKILL_BONUS = [0, 2, 3, 3, 4];
export const MAGIC_DEFENSE = [0, 2, 3, 3, 3];
export const SD_PP_BONUS = [0, 2, 3, 3, 4];
export const QU_INIT_BONUS = [0, 5, 8, 9, 10];
export const IN_INIT_BONUS = [0, 2, 4, 6, 8];
export const TRAINED_SKILL_BONUS = [0, 0, 1, 1, 2];
// Attribute constants based off of Level constant and AttributeStrength enum
export const VI_HP_BONUS = [
  [0, 0, 0, 0, 0], // should never happen cause there is no level 0 but done to keep level 1 - 10 rather than 0-9 as an index
  [0, 5, 8, 10, 12],
  [0, 6, 10, 12, 14],
  [0, 7, 11, 14, 17],
  [0, 8, 13, 16, 20],
  [0, 9, 15, 19, 22],
  [0, 10, 17, 21, 25],
  [0, 11, 18, 23, 28],
  [0, 13, 12, 25, 30],
  [0, 14, 22, 28, 33],
  [0, 15, 24, 30, 36]
];
export const QU_HP_BONUS = [
  [0, 0, 0, 0, 0], // should never happen cause there is no level 0 but done to keep level 1 - 10 rather than 0-9 as an index
  [0, 2, 3, 4, 5],
  [0, 2, 3, 5, 6],
  [0, 3, 4, 6, 7],
  [0, 3, 5, 6, 8],
  [0, 4, 5, 7, 9],
  [0, 4, 6, 8, 10],
  [0, 4, 7, 9, 11],
  [0, 5, 7, 10, 13],
  [0, 5, 8, 11, 14],
  [0, 6, 9, 12, 15]
];

export const SD_HP_BONUS = [
  [0, 0, 0, 0, 0], // should never happen cause there is no level 0 but done to keep level 1 - 10 rather than 0-9 as an index
  [0, 1, 2, 4, 4],
  [0, 1, 2, 5, 5],
  [0, 1, 2, 6, 6],
  [0, 1, 3, 6, 6],
  [0, 2, 3, 7, 7],
  [0, 2, 3, 8, 8],
  [0, 2, 3, 9, 9],
  [0, 2, 4, 10, 10],
  [0, 3, 4, 11, 11],
  [0, 3, 4, 12, 12]
];

export const IN_THP_BONUS = [
  [0, 0, 0, 0, 0], // should never happen cause there is no level 0 but done to keep level 1 - 10 rather than 0-9 as an index
  [0, 2, 3, 4, 5],
  [0, 2, 3, 5, 6],
  [0, 3, 4, 6, 7],
  [0, 3, 5, 6, 8],
  [0, 4, 5, 7, 9],
  [0, 4, 6, 8, 10],
  [0, 4, 7, 9, 11],
  [0, 5, 7, 10, 13],
  [0, 5, 8, 11, 14],
  [0, 6, 9, 12, 15]
];

export const STARTING_PLAYER_RACES = {
  Altwani: {
    vision: VisionType.Low,
    startingAttributes: [AttributeName.Agility, AttributeName.Reasoning, AttributeName.Intuition],
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Stealth],
    passiveBonuses: [
      {
        name: "Catstep",
        value: "Abilities that allow you to shift and tactical move ignore difficult terrain"
      } as Bonus
    ],
    activeBonuses: [
      {
        name: "Perfect Attack",
        value: "Once per encounter you may reroll an attack or spell attack roll."
      }
    ]
  } as Race,
  Burman: {
    vision: VisionType.Star,
    startingAttributes: [AttributeName.Brawn, AttributeName.Reasoning, AttributeName.Vitality],
    availableLanguagePoints: 3,
    magicDefenseBonus: MagicDefenseType.Will,
    passiveBonuses: [
      {
        name: "Virile Recovery",
        value: "Increase your recovery value by $Virile Recovery$"
      },
      {
        name: "Low Center of Mass",
        value: "Any time you are affected with a non-falling attack that results in you being knocked prone you can make a medium saving throw, if the roll is successful you ignore the knockdown effect."
      }
    ],
    activeBonuses: [
      {
        name: "Tough as Nails",
        value: "Once per combat as a minor action you gain $Tough as Nails$ temporary hit points and reduce the damage category of all attacks against you by one until the start of your next turn."
      },
    ],
    mechanicalBonusValues: {
      "Tough as Nails": ["6", "7", "8", "10", "11", "12", "14", "15", "16", "18"],
      "Virile Recovery": ["1", "1", "1", "2", "2", "2", "2", "3", "3", "3"]
    } as BonusByLevel
  } as Race,
  Elder: {
    startingAttributes: [AttributeName.Vitality, AttributeName.SelfDiscipline, AttributeName.Intuition],
    availableLanguagePoints: 4,
    talentBonus: [ThemeType.Combat, ThemeType.Magic],
    passiveBonuses: [
      {
        name: "Steady Gait",
        value: "As part of any movement you can reduce your speed by 1 to ignore difficult terrain for the action"
      }
    ],
    activeBonuses: [
      {
        name: "Resistance of the Ancients",
        value: "As a minor action you can remove all decaying effects on you and reduce your ongoing by $Resistance of the Ancients$"
      },
    ],
    mechanicalBonusValues: {
      "Resistance of the Ancients": ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]
    } as BonusByLevel
  } as Race,
  Human: {
    startingAttributes: [],
    availableAttributePoints: 6,
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.General],
    powerPointBonus: 1,
    skillPointBonus: 1,
    passiveBonuses: [
      {
        name: "Powerpoint Bonus",
        value: "Start with 1 additional powerpoint"
      }, {
        name: "Skill point Bonus",
        value: "Start with 1 additional skill point"
      },
    ],
    activeBonuses: [
      {
        name: "Oh the Humanity",
        value: "As a minor action you can gain a +4 to hit with all attacks and any critical rolls gain 1 additional die until the end of your turn."
      },
    ]
  } as Race,
  Feydra: {
    startingAttributes: [AttributeName.Agility, AttributeName.SelfDiscipline],
    optionalStartingAttributes: [AttributeName.Presence, AttributeName.Reasoning],
    vision: VisionType.Low,
    availableLanguagePoints: 6,
    magicDefenseBonus: MagicDefenseType.Reflex,
    passiveBonuses: [
      {
        name: "Eldritch Enervation",
        value: "Heal $Eldritch Infusion$ hit points when scoring a critical strike on an attack"
      }
    ],
    activeBonuses: [
      {
        name: "Eldritch Infusion",
        value: "As a minor action you gain advantage to the first roll of an attack or spell cast this turn.  You also increase the damage inflicted to all targets by $Eldritch Infusion$"
      },
    ],
    mechanicalBonusValues: {
      "Eldritch Enervation": ["4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
      "Eldritch Infusion": ["1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "1 extra damage die.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice.",
        "2 extra damage dice."
      ]
    } as BonusByLevel
  } as Race,
  Gryx: {
    startingAttributes: [AttributeName.Brawn, AttributeName.Presence, AttributeName.Quickness],
    vision: VisionType.Low,
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Combat],
    passiveBonuses: [
      {
        name: "Cut to the Chase",
        value: "You can perform a Standard Action Attack while charging instead of a basic attack."
      }
    ],
    activeBonuses: [
      {
        name: "Blood Rage",
        value: "As a swift action you gain an extra move action, and during this turn any skill check that uses brawn gains advantage"
      }
    ]
  } as Race,
  Primental: {
    startingAttributes: [AttributeName.Brawn, AttributeName.Intuition],
    optionalStartingAttributes: [AttributeName.Reasoning, AttributeName.Presence],
    availableLanguagePoints: 3,
    talentBonus: [ThemeType.Magic],
    passiveBonuses: [
      {
        name: "Elemental Resistance",
        value: "You gain $Elemental Resistance$ resistance to the $racialSubTypePassive$ keyword and $Other Elemental Resistance$ to all other magic damage keywords"
      }, {
        name: "Elemental Type",
        value: ""
      }
    ],
    activeBonuses: [
      {
        name: "Elemental Release",
        value: "As a $racialSubTypeActive$."
      }
    ],
    mechanicalBonusValues: {
      "Elemental Resistance": ["3", "4", "5", "5", "6", "7", "7", "8", "9", "9"],
      "Other Elemental Resistance": ["2", "2", "3", "3", "4", "4", "5", "5", "6", "6"],
      racialSubTypePassive: [
        "Force",
        "Lightning",
        "Heat",
        "Cold",
      ],
      racialSubTypeActive: [
        "minor action strike the ground with tremendous force.  All adjacent enemies must make a hard saving throw (" + SavingThrow.Hard + ") throw or be knocked prone",
        "when you are hit with a melee attack by an enemy you can have the attacking enemy take $Lightning$ lightning damage as a free action",
        "minor action any successful attacks gain the heat keyword and do an additional $Heat$ heat damage (roll once)",
        "swift action you ignore all difficult terrain and your movement does not provoke opportunity attacks until the end of your turn"
      ],
      Lightning: ["17", "21", "25", "29", "33", "37", "41", "45", "49", "53"],
      Heat: [
        new Dice(1, DiceSize.d8, 3).printRoll(),
        new Dice(1, DiceSize.d8, 4).printRoll(),
        new Dice(1, DiceSize.d8, 6).printRoll(),
        new Dice(1, DiceSize.d10, 7).printRoll(),
        new Dice(1, DiceSize.d10, 9).printRoll(),
        new Dice(1, DiceSize.d10, 10).printRoll(),
        new Dice(1, DiceSize.d10, 12).printRoll(),
        new Dice(1, DiceSize.d12, 13).printRoll(),
        new Dice(1, DiceSize.d12, 15).printRoll(),
        new Dice(1, DiceSize.d12, 16).printRoll(),

      ]
    } as BonusByLevel
  } as Race,
  Halfling: {
    startingAttributes: [AttributeName.Agility, AttributeName.Presence, AttributeName.Quickness],
    vision: VisionType.Low,
    availableLanguagePoints: 5,
    magicDefenseBonus: MagicDefenseType.Fortitude,
    passiveBonuses: [
      {
        name: "No Small Skill",
        value: "Increase the game your agility applies to weapons by $No Small Skill$.  Increase the damage your presence applies to magic attacks by $No Small Skill$"
      } as Bonus, {
        name: "Sheer Luck",
        value: "Gain a +1 bonus to your saving throw rolls"
      } as Bonus
    ],
    activeBonuses: [
      {
        name: "Tiny Target",
        value: "As a free action reduce the damage of an attack that targets AD or Reflex by $Tiny Target$"
      }
    ],
    racialRestriction: "Can't use two handed melee weapons",
    mechanicalBonusValues: {
      "No Small Skill": ["1", "1", "1", "1", "1", "2", "2", "2", "2", "2"],
      "Tiny Target": ["11", "14", "16", "19", "21", "24", "26", "29", "31", "34"]
    } as BonusByLevel
  } as Race

};


export const BASE_WEAPON_DAMAGE = {
  Agile: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, -1),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [6, 12, 18]
    } as WeaponType,
    Unarmed: {
      damage: new Dice(2, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d8, 0),
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 0),
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d12, 0)
    } as WeaponType,
    Polearm: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 1),
      range: [2]
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d10, 0),
      range: [12, 25, 50],
      specialText: "Move action to Reload"
    } as WeaponType
  },
  Balanced: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, 0),
      critical: new Dice(1, DiceSize.d6, 1),
      range: [5, 10, 15]
    } as WeaponType,
    Unarmed: {
      damage: new Dice(2, DiceSize.d6, 1),
      critical: new Dice(1, DiceSize.d6, 0),
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0)
    } as WeaponType,
    Polearm: {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [2]
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      range: [12, 25, 50],
      specialText: "Move action to Reload"
    } as WeaponType
  },
  Heavy: {
    Thrown: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d8, 0),
      critical: new Dice(1, DiceSize.d8, 0),
      range: [4, 8, 12],
      specialText: "-1 to hit"
    } as WeaponType,
    Unarmed: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d8, 1),
      critical: new Dice(1, DiceSize.d6, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    "Melee 1h": {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    "Melee 2h": {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d12, 0),
      critical: new Dice(1, DiceSize.d10, 1),
      specialText: "-1 to hit"
    } as WeaponType,
    Polearm: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d10, 0),
      range: [2],
      specialText: "-1 to hit"
    } as WeaponType,
    Ranged: {
      attack: new Dice(2, 12, 2),
      damage: new Dice(2, DiceSize.d10, 0),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [15, 30, 60],
      specialText: "1- to hit, Move action to Reload"
    } as WeaponType
  },
  Simple: {
    Thrown: {
      damage: new Dice(2, DiceSize.d6, -1),
      critical: new Dice(1, DiceSize.d6, 0),
      range: [3, 6, 9],
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    "Melee 1h": {
      damage: new Dice(2, DiceSize.d6, 2),
      critical: new Dice(1, DiceSize.d6, 1),
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    "Melee 2h": {
      damage: new Dice(2, DiceSize.d8, 2),
      critical: new Dice(1, DiceSize.d8, 1),
      specialText: "Requires no training, no extra attribute damage"
    } as WeaponType,
    Ranged: {
      damage: new Dice(2, DiceSize.d6, 2),
      critical: new Dice(1, DiceSize.d8, 1),
      range: [10, 20, 40],
      specialText: "Requires no training, no extra attribute damage, Move action to Reload"
    } as WeaponType
  }
};

export class StartingCharacterMagicDefense {
   Fortitude =  new MagicDefense(MagicDefenseType.Fortitude, new Field(10));
   Reflex = new MagicDefense(MagicDefenseType.Reflex, new Field(10));
   Will = new MagicDefense(MagicDefenseType.Will, new Field(10));
}



