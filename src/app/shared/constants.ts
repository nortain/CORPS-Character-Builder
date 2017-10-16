import {MaxMovement} from "./armor/max-movement";
import {FieldMap} from "./field/field-map";
import {WeaponType} from "./weapon/weapon-type";
import {WeaponCategory} from "./weapon/weapon-category.enum";
import {WeaponClass} from "./weapon/weapon-class.enum";
import {Dice} from "./character/dice";
import {DiceSize} from "./character/dice-size.enum";
import {MagicDefenseType} from "./magic-defense/magic-defense-type.enum";
import {Field} from "./field/field";
import {MagicDefense} from "./magic-defense/magic-defense";
import {Race} from "./character/race/race";
import {VisionType} from "./character/race/vision-type.enum";
import {AttributeName} from "./attribute/attribute-name.enum";
import {ThemeType} from "./theme-points/theme-type.enum";
import {Bonus} from "./character/bonus";

export const AVAILABLE_THEME_POINTS = 4;

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

// Attribute constants based off of the AttributeStrength enum
export const PRIMARY_DAMAGE = [0, 3, 6, 7, 8];
export const SECONDARY_DAMAGE = [0, 2, 4, 5, 6];
export const SKILL_BONUS = [0, 2, 3, 3, 4];
export const MAGIC_DEFENSE = [0, 2, 3, 3, 3];
export const SD_PP_BONUS = [0, 2, 3, 3, 4];
export const QU_INIT_BONUS = [0, 5, 8, 9, 10];
export const IN_INIT_BONUS = [0, 2, 3, 4, 5];
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
      "Tough as Nails": [6, 7, 8, 10, 11, 12, 14, 15, 16, 18],
      "Virile Recovery": [1, 1, 1, 2, 2, 2, 2, 3, 3, 3]
    }
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

export const STARTING_MAGIC_DEFENSES = [
  new MagicDefense(MagicDefenseType.Fortitude, new Field(10)),
  new MagicDefense(MagicDefenseType.Reflex, new Field(10)),
  new MagicDefense(MagicDefenseType.Will, new Field(10))
];
