import {ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Character} from "../shared/character/character";
import {AttributeService} from "../shared/attribute/attribute.service";
import {RaceType} from "../shared/character/race/race-type.enum";
import {DropdownValueObject} from "../shared/ui/dropdown/dropdown-value-object";
import {ThemePointsContainer} from "../shared/theme-points/theme-points-container";
import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";

import {MagicDefenseType} from "../shared/character/magic-defense/magic-defense-type.enum";
import {AttributeBonus} from "../shared/attribute/character-attribute/attribute-bonus.enum";
import {Race} from "../shared/character/race/race";
import {STARTING_HIT_POINTS} from "../shared/constants/constants";

@Component({
  selector: 'corps-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSheetComponent implements OnInit, OnChanges {

  character: Character;
  races: DropdownValueObject[];
  subraces: DropdownValueObject[];
  levels: DropdownValueObject[];

  RaceType = RaceType; // expose racetype to the UI
  MagicDefenseType = MagicDefenseType;

  constructor(private attributeService: AttributeService) {
  }

  ngOnChanges() {
    console.log("ngchanges was called");
  }

  ngOnInit() {
    this.races = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RaceType, false);
    this.levels = this.attributeService.buildArrayAsDropdownArray(this.attributeService.getLevelAsArray());
    this.subraces = this.attributeService.getArrayOfDropdownValueObjectsFromEnum(RacialSubType, false);
    const raceType = this.races[0].label;
    this.character = new Character("", RaceType[raceType] as RaceType);
  }

  reloadCharacter(propertyName: string, valueChange: any) {
    console.log("Character has been reloaded");
    this.character[propertyName] = valueChange;
    this.character = this.cloneCharacter();
  }

  startReloadWithRace(raceString: string) {
    if (RaceType[raceString] !== RaceType.Primental) {
      this.character.racialSubType = null;
    }
    this.reloadCharacter("raceType", RaceType[raceString]);
  }

  startReloadWithLevel(level: number) {
    this.reloadCharacter("level", level);
  }

  updateSubRace(subrace: string) {
    this.reloadCharacter("racialSubType", RacialSubType[subrace]);
  }

  updateThemePoints(updatedThemePoints: ThemePointsContainer) {
    this.reloadCharacter("themePoints", updatedThemePoints);
  }

  getHitPointsValue(): number {
    let hp = STARTING_HIT_POINTS;
    const level =  (this.character.level + 2);
    const themeBonus = (this.character.themePoints.combat.getStrength() * 2 + this.character.themePoints.stealth.getStrength());
    const attributes = + this.character.attributes.getBonus(AttributeBonus.HitPointBonus, this.character.level);
    const multiplier = 6;
    hp += level * multiplier;
    hp += themeBonus;
    hp += attributes;
    return hp;
  }

  getRecoveries(): number {
    return 0;
  }

  getRecoveryValue(): number {
    return 0;
  }

  getOutofCombatRecoveryValue(): number {
    return 0;
  }


  getCriticalReductionValue(): number {
    return 0;
  }

  getPrimaryMagicResistanceValue(): number {
    return 0;
  }

  getSecondaryMagicRestanceValue(): number {
    return Math.round(this.getPrimaryMagicResistanceValue() * .75);
  }

  getPrimaryMagicReistances(): string[] {
    return [];
  }

  getPowerPoints(): number {
    return 0;
  }

  getAdrenalinePoints(): number {
    return 0;
  }

  getBloodiedValue(): number {
    return Math.floor(this.getHitPointsValue() / 2);
  }

  getAuras(): string[] {
    return null;
  }


  getActiveDefenseValue(): number {
    let ad = this.character.physicalDefense.getActiveDefensiveValue();
    ad += this.character.attributes.getBonus(
      AttributeBonus.ArmorBonus,
      this.character.physicalDefense.armor);
    return ad;
  }

  getPassiveDefenseValue(): number {
    return this.character.physicalDefense.getPassiveDefensiveValue();
  }

  getMagicDefensiveValue(magicDefenseType: MagicDefenseType): number {
    let magicDef = this.character.magicDefense[MagicDefenseType[magicDefenseType]].getDefense();
    if (this.character.magicDefenseBonus === magicDefenseType) {
      magicDef++;
    }
    const themePointBonus = this.character.themePoints.getDefensiveBonus();
    if (themePointBonus.length === 1 && themePointBonus[0] === magicDefenseType) {
      magicDef++;
    }
    magicDef += this.character.attributes.getBonus(AttributeBonus.MagicDefense, magicDefenseType);
    return magicDef;
  }

  assignMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName: string, bonusValue: number) {
    this.character.magicDefense[MagicDefenseType[magicDefenseType]].addDefenseBonus(bonusName, bonusValue);
  }

  /**
   * removes bonus for the given magidDefenseType that has a name matching to the string passed in.  If no string is passed in then all bonuses for the magic defense type are removed.
   * @param {MagicDefenseType} magicDefenseType
   * @param {string} bonusName
   */
  removeMagicDefensiveBonus(magicDefenseType: MagicDefenseType, bonusName?: string) {
    this.character.magicDefense[MagicDefenseType[magicDefenseType]].removeDefenseBonus(bonusName);
  }

  cloneCharacter() {
    const char = new Character(
      this.character.name,
      this.character.raceType,
      this.character.level,
      this.character.racialSubType,
      this.character.themePoints,
      this.character.physicalDefense,
      this.character.weapons,
      this.character.magicDefense,
      this.character.attributes
    );
    return char;
  }


}
