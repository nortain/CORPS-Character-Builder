import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {Character} from "../character/character";
import {RaceType} from "../character/race/race-type.enum";
import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";
import {PhysicalDefense} from "../character/physical-defense/physical-defense";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {ThemeStrength} from "../theme-points/theme-strength.enum";
import {Subtheme} from "../theme-points/subthemes/subtheme";
import {CasterType, SubthemeType} from "../theme-points/subthemes/subtheme-type.enum";
import {SpellType} from "../spells/enums/spell-type.enum";
import {SpellKeyword} from "../spells/enums/spell-keywords.enum";
import {SpellDamageKeyword} from "../spells/enums/spell-damage-keyword.enum";
import {AreaOfEffect} from "../area-of-effect/area-of-effect";
import {Spell, SpellEffectType} from "../spells/spell";
import {ActionType} from "../action/action-type.enum";
import {DurationType} from "../duration/duration-type.enum";
import {Dice} from "../character/dice/dice";
import {DiceSize} from "../character/dice/dice-size.enum";
import {SpellChart} from "../spells/spell-chart";
import {AreaOfEffectType} from "../area-of-effect/area-of-effect-type.enum";
import {LevelRange} from "../spells/enums/level-range.enum";
import {AllDefenseType} from "../character/physical-defense/physical-defense-type.enum";
import {CasterBuild, SpecialPower} from "./constants";
import {SpellRequirement} from "../spells/enums/spell-requirement.enum";

export function mockDropdownData() {
  return [
    {value: 3, label: "bob"},
    {value: 5, label: "moe"},
    {value: -1, label: "tom"}
  ] as DropdownValueObject[];
}

export function mockCharacter(name = "Bob", raceType = RaceType.Altwani) {
  const character = new Character(name, raceType);
  return character;
}

export function mockSubtheme(subthemeType?: SubthemeType, str?: ThemeStrength): Subtheme {
  if (!subthemeType) {
    subthemeType = SubthemeType.Riposte;
  }
  str = !!str ? str : ThemeStrength.None;
  const sub = new Subtheme(subthemeType, str);
  return sub;
}

export function mockDefense() {
  return new PhysicalDefense();
}

export function mockKnack() {
  return {
    name: "Riposte",
    text: "You get shanked",
    subthemeName: "Riposte"
  };
}

export function mockBuild(): CasterBuild {
  const mock = [{
    ...mockKnack(),
    subthemeName: "Magent"
  }];
  const build = mockSpecialPower();
  const special = mockSpecialPower();
  special.requirement = SpellRequirement.Special;
  const spells = [mockSpell()];
  return {
    spells: spells,
    build: build,
    specialBuild: special,
    knacks: mock,
  };

}

export function mockSpecialPower(): SpecialPower {
  return {
    name: "Order of awesome",
    powers: [mockSpell(), mockSpell()],
    requirement: SpellRequirement.Always
  } as SpecialPower;
}

export function mockThemePoints() {
  return new ThemePointsContainer(ThemeStrength.Minor, ThemeStrength.Minor, ThemeStrength.Minor, ThemeStrength.Minor);
}

/**This helper function for testing.
 It will click on a dropdown button matching the selector string and then choose the xth dropdown menu item.
 If the xth item doesn't exist an error is thrown.
 This will also update UI after the button click has been performed.*/
export function actionClickDropdownItemX(fixture: ComponentFixture<any>, selector: string, x = 0) {
  const dropdown = fixture.debugElement.query(By.css(selector));
  const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
  dropdownBtn.click();
  const menuItem = dropdown.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
  menuItem[x].nativeElement.click();
  fixture.detectChanges();
}

/**
 * This helper function will return the currently selected value fo the given fixture and dropdown selector
 * @param {ComponentFixture<any>} fixture
 * @param {string} selector
 */
export function actionGetDropdownValue(fixture: ComponentFixture<any>, selector: string) {
  const dropdown = fixture.debugElement.query(By.css(selector));
  const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
  return dropdownBtn.innerText;
}

export function mockAreaOfEffect(): AreaOfEffect {
  return {
    numberOfTargets: 2,
    range: 10,
    type: AreaOfEffectType.Zone

  } as AreaOfEffect;
}

export function mockSpellChart(): SpellChart {
  return {
    rowName: "Damage",
    levelRange: LevelRange.FIFTHTEEN,
    minValue: 12.11,
    maxValue: 38.33,
    dieSize: DiceSize.d8,
    damageKeyword: SpellDamageKeyword.Arcane
  } as SpellChart;
}

export function mockSpell(): Spell {
  return {
    name: "Fireball",
    sphereName: CasterType.Archmage,
    defenseType: [AllDefenseType.Active, AllDefenseType.Passive],
    spellType: SpellType.DirectAttack,
    spellKeywords: [SpellKeyword.Manipulate],
    damageKeyword: SpellDamageKeyword.Wild,
    areaOfEffect: mockAreaOfEffect(),
    castAction: ActionType.Standard,
    duration: [DurationType.Immediate, DurationType.Encounter],
    critRoll: new Dice(1, DiceSize.d6, 1),
    special: [
      "This can only be cast once per encounter"
    ],
    spellEffectText: [
      {
        type: SpellEffectType.SpellEffect,
        text: "You spit on the ground.",
        spellChart: [mockSpellChart()]
      }, {
        type: SpellEffectType.OnHit,
        text: "You launch a big ass ball of fiery death towards your enemies.",
        spellChart: [mockSpellChart()]
      }, {
        type: SpellEffectType.Bounce,
        text: "When you kill someone with this attack you can bounce it.",
        spellChart: [mockSpellChart()]
      }, {
        type: SpellEffectType.OnMiss,
        text: "Even if you miss you rock their face in.",
        spellChart: [mockSpellChart()]
      }, {
        type: SpellEffectType.AfterEffect,
        text: "This bitch keeps going like the energizer bunny.",
        spellChart: [mockSpellChart()]
      }
    ],
    spellChart: [
      mockSpellChart(),
      mockSpellChart()
    ]
  } as Spell;
}


