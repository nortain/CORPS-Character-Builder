import {AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {Character} from "../shared/character/character";
import {AttributeService} from "../shared/attribute/attribute.service";
import {RaceType} from "../shared/character/race/race-type.enum";
import {DropdownValueObject} from "../shared/ui/dropdown/dropdown-value-object";
import {ThemePointsContainer} from "../shared/theme-points/theme-points-container";
import {RacialSubType, RacialSubTypeStringToEnumIndex, RacialSubTypeToDamageKeyword} from "../shared/character/race/racial-sub-type.enum";

import {MagicDefenseType} from "../shared/character/magic-defense/magic-defense-type.enum";
import {AttributeBonus} from "../shared/attribute/character-attribute/attribute-bonus.enum";
import {CombatAndResourceBonusObject, MAGIC_FIGHTING_STYLE, MagicResistance, MARTIAL_FIGHTING_STYLE, STARTING_HIT_POINTS, STARTING_PLAYER_RACES, STARTING_RECOVERIES} from "../shared/constants/constants";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {SubthemeComponent} from "./character-subtheme-modal/subthemes/subtheme.component";
import {CharacterSubthemeModalComponent} from "./character-subtheme-modal/character-subthemes/character-subtheme-modal.component";
import {AttributeName} from "../shared/attribute/attribute-name.enum";
import {SpellDamageKeyword} from "../shared/spells/enums/spell-damage-keyword.enum";
import {DropdownComponent} from "../shared/ui/dropdown/dropdown.component";
import {StartingCharacterAttributes} from "../shared/attribute/character-attribute/starting-character-attributes";

@Component({
  selector: 'corps-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSheetComponent implements OnInit, OnChanges, AfterViewChecked {

  @ViewChild('subRace') subRace: DropdownComponent;

  character: Character;
  races: DropdownValueObject[];
  subraces: DropdownValueObject[];
  levels: DropdownValueObject[];

  RaceType = RaceType; // expose racetype to the UI
  MagicDefenseType = MagicDefenseType;

  constructor(private attributeService: AttributeService, private modalService: NgbModal) {
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

  ngAfterViewChecked() {
    const hasDropdown = this.subRace && this.subRace.selectedValue;
    const isPrimentalWithoutASubrace = this.character
      && this.character.raceType === RaceType.Primental
      && !this.character.racialSubType;
    if (hasDropdown && isPrimentalWithoutASubrace) {
      this.updateSubRace(this.subRace.selectedValue.value);
    }
  }

  getOptionalStartingAttributesAsDropdownValueObjects(): DropdownValueObject[] {
    if (this.character.optionalStartingAttributes) {
      return this.attributeService.buildArrayAsDropdownArray(this.character.optionalStartingAttributes);
    } else {
      return null;
    }
  }

  reloadCharacter(propertyName: string, valueChange: any) {
    console.log("Character has been reloaded");
    this.character[propertyName] = valueChange;
    const isStartingAttributes = propertyName === "startingAttributes";
    const makeNewSubtheme = propertyName === "themePoints";
    this.character = this.cloneCharacter(makeNewSubtheme, isStartingAttributes);
  }

  updateCharacterRace(raceString: RaceType) {
    if (RaceType[raceString] !== RaceType.Primental) {
      this.character.racialSubType = null;
    }
    this.character.attributes = new StartingCharacterAttributes();
    this.reloadCharacter("raceType", RaceType[raceString]);
  }

  updateCharacterFightingStyle(fightingStyle: AttributeName[]) {
    this.reloadCharacter("fightingStyle", fightingStyle);
  }

  /**
   * reloads the character because the level was changed
   * @param {number} level
   */
  updateCharacterLevel(level: number) {
    this.reloadCharacter("level", level);
  }

  updateStartingRacialAttributes(attribute: AttributeName) {
    this.character.startingAttributes = [...STARTING_PLAYER_RACES[this.character.raceType].startingAttributes];
    if (this.character.optionalStartingAttributes) {
      this.character.startingAttributes.push(attribute);
    }
    this.reloadCharacter("startingAttributes", this.character.startingAttributes);
  }

  updateSubRace(subrace: RacialSubType) {
    this.reloadCharacter("racialSubType", RacialSubType[subrace]);
  }

  updateThemePoints(updatedThemePoints: ThemePointsContainer) {
    this.reloadCharacter("themePoints", updatedThemePoints);
  }

  /**
   * launch subtheme modal
   */
  launchSubthemesModal() {
    const modalOptions = {
      backdrop: "static",
      windowClass: "xlModal"
    } as NgbModalOptions;
    const ref = this.modalService.open(CharacterSubthemeModalComponent, modalOptions);
    ref.componentInstance.subthemePoints = this.character.subthemes;
    ref.componentInstance.characterLevel = this.character.level;

    ref.result.then((subthemeContainer) => {
      this.reloadCharacter("subthemes", subthemeContainer);
    }, (err) => {
      console.log("User dismissed with err msg : ", err);
    });
  }

  /**
   * based on theme points selected this will determine if a character should pick a martial or magic fighting style.  Fighting style dictates which offensive attributes are used for providing bonus damage.
   * @returns {DropdownValueObject[]}
   */
  getFightingStyle(): DropdownValueObject[] {
    const martial = this.character.themePoints.combat.getStrength() + this.character.themePoints.stealth.getStrength();
    if (martial > 1) {
      return MARTIAL_FIGHTING_STYLE;
    } else {
      return MAGIC_FIGHTING_STYLE;
    }
  }

  /**
   * calculates out what a characters max hit points are based on theme points, attributes, level and talent bonuses
   * @returns {number} of hit points character has
   */
  getHitPointsValue(): number {
    let hp = STARTING_HIT_POINTS;
    const level = (this.character.level + 3);
    const themeBonus = (8 + this.character.themePoints.combat.getStrength() * .5 + this.character.themePoints.stealth.getStrength() * .25);
    const attributes = +this.character.attributes.getBonus(AttributeBonus.HitPointBonus, this.character.level);
    const talentBonusHp = 0; // TODO add talents
    hp += Math.floor(level * themeBonus);
    hp += talentBonusHp;
    hp += attributes;
    return hp;
  }

  getTemporaryHitPointsValue(): number {
    let thp = 0;
    // bonus from stats
    // bonus from talents
    thp += 0; // remove me when logic is complete
    return thp;
  }


  getRecoveries(): number {
    let recoveries = STARTING_RECOVERIES;
    const talentBonus = 0; // TODO add talents
    recoveries += this.character.attributes.getBonus(AttributeBonus.RecoveryBonus);
    recoveries += talentBonus;
    return recoveries;
  }

  // floor(getOOCRV / 1.75)
  getRecoveryValue(): number {
    return Math.floor(this.getOutofCombatRecoveryValue() / 1.75);
  }

  // 45% of HP + bonus Recovery + if general > 1 then Floor((general+4)/4)
  getOutofCombatRecoveryValue(): number {
    let ooc = this.getHitPointsValue() * .45;
    const talentBonus = 0; // TODO add talents
    ooc += talentBonus;
    ooc += this.character.recoveryBonus;
    ooc += this.character.themePoints.getOOCRecoveryValue();
    return Math.floor(ooc);
  }

  openModalWindow(modalOptions?) {
    if (!modalOptions) {
      modalOptions = {
        backdrop: "static",
        windowClass: "lg"
      };
    }
    const modalRef = this.modalService.open(SubthemeComponent, modalOptions);
    modalRef.result.then((result) => {
      console.log("modal was closed with result: ", result);
    }, (rejected) => {
      console.log("modal was rejected with: ", rejected);
    });
  }


  getCriticalReductionValue(): number {
    let crv = 0;
    const talentBonus = 0; // TODO add talents
    const subThemeBonus = 0; // TODO add subthemes
    crv += this.character.physicalDefense.armor.getCritReduction();
    crv += talentBonus;
    crv += subThemeBonus;
    return crv;
  }

  getPrimaryMagicResistanceValues(): MagicResistance[] {
    const magicResistances = [];
    let pmr = 0;
    const resistanceAsString = this.character.getMechanicalBonus("Elemental Resistance");
    pmr += resistanceAsString ? parseInt(resistanceAsString, 10) : 0;
    if (pmr > 0) {
      const type = SpellDamageKeyword[RacialSubTypeToDamageKeyword[this.character.racialSubType]];
      magicResistances.push(new MagicResistance(type, pmr));
    }
    return magicResistances;
  }

  getSecondaryMagicRestanceValue(): number {
    let highestResistance = 0;
    for (const resistance of this.getPrimaryMagicResistanceValues()) {
      if (resistance.value > highestResistance) {
        highestResistance = resistance.value;
      }
    }
    return Math.round(highestResistance * .75);
  }

  getPrimaryMagicReistances(): string[] {
    return [];
  }

  getPowerPoints(): number {
    let powerPoints = 2;
    const talentBonus = 0; // TODO add talents
    powerPoints += this.character.attributes.getBonus(AttributeBonus.PowerPointBonus);
    powerPoints += this.character.themePoints.getPowerPointBonus();
    powerPoints += this.character.powerPointBonus;
    powerPoints += talentBonus;
    powerPoints += Math.floor(this.character.level / 4);
    return powerPoints;
  }

  getAdrenalinePoints(): number {
    return this.character.themePoints.getAdrenalinePoints();
  }

  getBloodiedValue(): number {
    return Math.floor(this.getHitPointsValue() / 2);
  }

  getCombatBonuses(): CombatAndResourceBonusObject[] {
    return this.character.getCombatAndResourceBonuses();
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

  /**
   * Called anytime a change to a character is made to update the UI.
   * @param {boolean} makeNewSubtheme, trigger a call to force a new subtheme to be created rather than passing in the same one.
   * @returns {Character}
   */
  cloneCharacter(makeNewSubtheme?: boolean, makeNewStartingAttributes?: boolean) {
    const subThemes = makeNewSubtheme ? undefined : this.character.subthemes;
    const startingAttributes = makeNewStartingAttributes ? this.character.startingAttributes : undefined;
    const char = new Character(
      this.character.name,
      this.character.raceType,
      this.character.level,
      this.character.racialSubType,
      this.character.themePoints,
      subThemes,
      this.character.physicalDefense,
      this.character.weapons,
      this.character.magicDefense,
      this.character.attributes,
      startingAttributes,
      this.character.fightingStyle
    );
    return char;
  }


}
