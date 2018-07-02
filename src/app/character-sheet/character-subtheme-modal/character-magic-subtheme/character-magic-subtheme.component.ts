import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {CasterBuild, Feature, Knack, SpecialPower, SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {MagicType, NumberToSelect, SpellSelectionType} from "./magic-type.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-type.enum";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "../../../shared/ui/confirmation/confirmation.component";
import {SpellRequirement} from "../../../shared/spells/enums/spell-requirement.enum";
import {Level} from "../../../shared/character/level.enum";
import {Spell} from "../../../shared/spells/spell";

@Component({
  selector: 'corps-character-magic-subtheme',
  templateUrl: './character-magic-subtheme.component.html',
  styleUrls: ['./character-magic-subtheme.component.css']
})
export class CharacterMagicSubthemeComponent implements OnInit, OnChanges {

  @Input() subtheme: Subtheme;
  @Input() generalThemePoint: ThemeStrength;
  @Input() previouslySelectedBuild: CasterBuild;
  @Input() subthemePointCap: number;
  @Input() characterLevel: Level;
  @Output() submitter: EventEmitter<CasterBuild>;

  magicType = MagicType;
  spellSelectionType = SpellSelectionType;
  spellRequirement = SpellRequirement;

  /**
   * a toggle switch to determine if knacks are open or not
   */
  knackDisplayToggle: boolean;
  /**
   * the number of knacks a character can select
   */
  numberOfKnacksToSelect: number;
  /**
   * maintains the build information that have been selected
   */
  selectedBuild: CasterBuild;


  /**
   * maintains an array of knacks that are toggled open
   */
  openKnacks: Knack[];

  constructor(private modalService: NgbModal, private ref: ChangeDetectorRef) {
    this.resetSubtheme();
    this.knackDisplayToggle = false;
    this.submitter = new EventEmitter<CasterBuild>();
  }

  ngOnInit() {
    if (this.previouslySelectedBuild && this.previouslySelectedBuild.subtheme) {
      if (this.previouslySelectedBuild.subtheme.subthemeName === this.subtheme.subthemeName) {
        this.selectedBuild = this.previouslySelectedBuild;
      }
    } else {// if we have nothing loaded set them all to the identical default value
      this.selectedBuild = this.previouslySelectedBuild = new CasterBuild();
    }
    this.determineNumberOfSelectableKnacks();
  }

  ngOnChanges() {
    this.determineNumberOfSelectableKnacks();
    this.submitter.emit({
      ...this.selectedBuild
    });
  }

  /**
   * this should look at all user choices for a magic subtheme and return true if any have been made and false otherwise.  A user choice in this case is selecting a build option, a knack or selecting spells.
   * @returns {boolean}
   */
  isThisDirty(): boolean {
    const dirtyKnacks = this.selectedBuild.knacks.length > 0;
    const dirtySpells = this.selectedBuild.spells.length > 0;
    const dirtyBuild = this.selectedBuild.build;
    const dirtySpecialBuild = this.selectedBuild.specialBuild;
    return dirtyKnacks || dirtySpells || !!dirtyBuild || !!dirtySpecialBuild;
  }

  resetSubtheme() {
    this.selectedBuild = new CasterBuild();
    this.openKnacks = [];
  }

  displayKnacks() {
    this.knackDisplayToggle = !this.knackDisplayToggle;
  }

  isSubthemeSelected() {
    return this.subtheme.themeStrength !== ThemeStrength.None;
  }

  selectSubtheme() {
    // if we don't have a subtheme selected, select it
    if (!this.isSubthemeSelected() && this.subthemePointCap > 0) {
      this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName], this.subtheme.maxThemeStrength);
      this.selectedBuild.subtheme = this.subtheme;
      // else warn them we will lose our selected subtheme
    } else if (this.isSubthemeSelected()) {
      if (this.isThisDirty()) {
        const options = {
          backdrop: "static",
          size: "sm",
          centered: true
        } as NgbModalOptions;
        const modalRef = this.modalService.open(ConfirmationComponent, options);
        modalRef.componentInstance.bodyText = ["You will lose all your changes for this subtheme if you deselect it.  Do you wish to continue?"];
        modalRef.result.then((result) => {
          if (result) {
            this.resetSubtheme();
            this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName]); // make new subtheme with 0 strength
            this.selectedBuild.subtheme = this.subtheme;
            this.ref.detectChanges(); // needed cause we are resolving a promise THEN updating UI
          }
        }, (rejected) => {
          console.error("The user rejected the confirmation modal: ", rejected);
        });
      } else { // if the form is not dirty just deselect the damn thing
        this.resetSubtheme();
        this.subtheme = new Subtheme(SubthemeType[this.subtheme.subthemeName]); // make new subtheme with 0 strength
        this.selectedBuild.subtheme = this.subtheme;
      }
    }// else do nothing
  }

  openKnack(knack: Knack) {
    const index = this.findIndexOfKnackByName(knack, this.openKnacks);
    if (index > -1) {
      this.openKnacks.splice(index, 1);
    } else {
      this.openKnacks.push(knack);
    }
  }

  isKnackOpen(knack: Knack) {
    return this.findIndexOfKnackByName(knack, this.openKnacks) > -1;
  }

  isKnackSelected(knack: Knack): boolean {
    if (this.selectedBuild.knacks && this.selectedBuild.knacks.length > 0) {
      return this.findIndexOfKnackByName(knack, this.selectedBuild.knacks) > -1;
    } else {
      return false;
    }


  }

  selectSpells(spells: Spell[]) {
    this.selectedBuild.spells = spells;
  }

  selectBuild(build: SpecialPower) {
    if (build) {
      if (build.requirement === SpellRequirement.Special) {
        if (!this.selectedBuild.specialBuild) { // select special build
          this.selectedBuild.specialBuild = build;
        } else if (this.selectedBuild.specialBuild.name === build.name) { // deselect special build
          this.selectedBuild.specialBuild = null;
        } // do nothing of consiquence
      } else { // normal build
        if (!this.selectedBuild.build) { // select build
          this.selectedBuild.build = build;
        } else if (this.selectedBuild.build.name === build.name) { // deselcted build
          this.selectedBuild.build = null;
        }// do nothing
      }
    }
  }

  selectKnack(knack: Knack) {
    const index = this.findIndexOfKnackByName(knack, this.selectedBuild.knacks);
    const hasKnackBeenSelected = index > -1;
    if (hasKnackBeenSelected) {
      this.selectedBuild.knacks.splice(index, 1);
    } else if (this.selectedBuild.knacks.length < this.numberOfKnacksToSelect) {
      this.selectedBuild.knacks.push(knack);
    }
  }

  getOverviewText(): string {
    const result = SUBTHEME_BONUS[this.subtheme.subthemeName].Overview;
    return result;
  }

  /**
   * Gets text from the SpellSphere interface
   * @param {MagicType} propertyName
   * @returns {string}
   */
  getMagicText(propertyName: MagicType): Feature {
    const result = SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
    return result;
  }

  getNumberOfSpells(): number {
    let result = SUBTHEME_BONUS[this.subtheme.subthemeName][NumberToSelect.NumberOfSpellsToSelect][this.characterLevel - 1];
    if (this.subthemePointCap !== ThemeStrength.Greater && this.generalThemePoint === ThemeStrength.Minor) {
      result++;
    }
    return result;
  }

  getSpecialPowers(): SpecialPower[] {
    const result = SUBTHEME_BONUS[this.subtheme.subthemeName][SpellSelectionType.SpecialPowers];
    return result;
  }

  getKnackData(knackName: string): number[] {
    const knacksObject = this.getMagicText(this.magicType.ImplementKnacksData);
    return knacksObject[knackName];
  }

  getKnackText(): Knack[] {
    const knacksObject = this.getMagicText(this.magicType.ImplementKnacks);
    const knacksArray = Object.keys(knacksObject);
    const result = [];
    for (const knack of knacksArray) {
      result.push({
        name: knack,
        text: knacksObject[knack],
        subthemeName: this.subtheme.subthemeName
      });
    }
    return result;
  }

  /**
   * cycles through all special powers of a sphere to see if any are special, if they are this returns true.  Special powers are a special kind of build that is similiar to a build but needs to be done in parallel.  Examples are the necromancer's minion spell choice of the warrior mage's sigil power
   * @returns {boolean}
   */
  isSphereSpecial(): boolean {
    if (this.getSpecialPowers()) {
      for (const power of this.getSpecialPowers()) {
        if (power.requirement === SpellRequirement.Special) {
          return true;
        }
      }
    }
    return false;
  }

  private findIndexOfKnackByName(element: Knack, array: Knack[]): number {
    for (const index of Object.keys(array)) {
      if (element.name === array[index].name) {
        return parseInt(index, 10);
      }
    }
    return -1;
  }

  private determineNumberOfSelectableKnacks() {
    this.numberOfKnacksToSelect = SUBTHEME_BONUS[this.subtheme.subthemeName][NumberToSelect.NumberOfKnacksToSelect][this.generalThemePoint];
  }
}


