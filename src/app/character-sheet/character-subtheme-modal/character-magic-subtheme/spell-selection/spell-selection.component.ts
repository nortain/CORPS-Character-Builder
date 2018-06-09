import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Subtheme} from "../../../../shared/theme-points/subthemes/subtheme";
import {ThemeStrength} from "../../../../shared/theme-points/theme-strength.enum";
import {NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {MagicType} from "../magic-type.enum";
import {ConfirmationComponent} from "../../../../shared/ui/confirmation/confirmation.component";
import {SubthemeTypes} from "../../../../shared/theme-points/subthemes/subtheme-types.enum";
import {Spell} from "../../../../shared/spells/spell";
import {Feature, SUBTHEME_BONUS} from "../../../../shared/constants/constants";

/**
 * This component is used to select powers or spells for the character
 */
@Component({
  selector: 'corps-spell-selection',
  templateUrl: './spell-selection.component.html',
  styleUrls: ['./spell-selection.component.css']
})
export class SpellSelectionComponent implements OnInit, OnChanges {

  /**
   * loads in the character subtheme
   */
  @Input() subtheme: Subtheme;
  /**
   * loads in if the character has a general theme point
   */
  @Input() generalThemePoint: ThemeStrength;
  /**
   * load in previous selected spells if any
   */
  @Input() previouslySelectedSpell: Spell[];
  /**
   * number of spells a character can select
   */
  @Input() numberOfSpellsToSelect: number;
  /**
   * This tells the component where it is getting it's spell data from
   */
  @Input() propertyType: MagicType;
  /**
   * This is the text value of how we are referring to this property, if no value is given then we default to Spell
   */
  @Input() propertyName: string;
  /**
   * output the subtheme and the selected spells with it
   */
  @Output() submitter: EventEmitter<{ subtheme: Subtheme, spells: Spell[] }>;

  /**
   * toggle to determine if content is displayed
   */
  selectionDisplayToggle: boolean;

  /**
   * maintain an array of spells that are selected
   */
  selectedSpells: Spell[];
  /**
   * maintain an array of which spells are open
   */
  openSpells: Spell[];

  constructor() {
    this.selectionDisplayToggle = false;
  }

  ngOnInit() {
    if (!this.propertyName) {
      this.propertyName = "Spell";
    }
    if (this.previouslySelectedSpell && this.previouslySelectedSpell.length > 0) {
      if (this.previouslySelectedSpell[0].sphereName === this.subtheme.subthemeName) {
        this.selectedSpells = this.previouslySelectedSpell;
      }
    }
  }

  ngOnChanges() {
    console.log("Something was changed");
  }

  /**
   * this should look at all user choices for a magic subtheme and return true if any have been made and false otherwise.  A user choice in this case is selecting a build option, a spell or selecting spells.
   * @returns {boolean}
   */
  isThisDirty(): boolean {
    const dirty = this.selectedSpells.length > 0;
    return dirty;
  }

  /**
   * clears out all selected and open spells
   */
  resetSubtheme() {
    this.selectedSpells = [];
    this.openSpells = [];
  }

  displaySpells() {
    this.selectionDisplayToggle = !this.selectionDisplayToggle;
  }

  isSubthemeSelected() {
    return this.subtheme.themeStrength !== ThemeStrength.None;
  }



  openSpell(spell: Spell) {
    const index = this.findIndexOfSpellByName(spell, this.openSpells);
    if (index > -1) {
      this.openSpells.splice(index, 1);
    } else {
      this.openSpells.push(spell);
    }
  }

  isSpellOpen(spell: Spell) {
    return this.findIndexOfSpellByName(spell, this.openSpells) > -1;
  }

  isSpellSelected(spell: Spell) {
    return this.findIndexOfSpellByName(spell, this.selectedSpells) > -1;
  }

  selectSpell(spell: Spell) {
    if (this.selectedSpells.length < this.numberOfSpellsToSelect) {
      this.selectedSpells.push(spell);
    } else {
      const index = this.findIndexOfSpellByName(spell, this.selectedSpells);
      if (index > -1) {
        this.selectedSpells.splice(index, 1);
      }
    }
  }

  /**
   * Gets text from the SpellSphere interface
   * @param {MagicType} propertyName
   * @returns {string}
   */
  getMagicText(propertyName: MagicType): Feature {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
  }

  getSpellData(spellName: string): number[] {
    const spellsObject = this.getMagicText(this.propertyType);
    return spellsObject[spellName];
  }

  getSpellText(): Spell[] {
    const spellsObject = this.getMagicText(this.propertyType);
    const spellsArray = Object.keys(spellsObject);
    const result = [];
    for (const spell of spellsArray) {
      result.push({
        name: spell,
        text: spellsObject[spell],
        subthemeName: this.subtheme.subthemeName
      });
    }
    return result;
  }

  private findIndexOfSpellByName(element: Spell, array: Spell[]): number {
    for (const index of Object.keys(array)) {
      if (element.name === array[index].name) {
        return parseInt(index, 10);
      }
    }
    return -1;
  }
}
