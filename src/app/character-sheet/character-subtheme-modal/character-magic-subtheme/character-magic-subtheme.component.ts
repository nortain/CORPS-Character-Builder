import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {Knack, SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {MagicType} from "./magic-type.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";

@Component({
  selector: 'corps-character-magic-subtheme',
  templateUrl: './character-magic-subtheme.component.html',
  styleUrls: ['./character-magic-subtheme.component.css']
})
export class CharacterMagicSubthemeComponent implements OnInit, OnChanges {

  @Input() subtheme: Subtheme;
  @Input() generalThemePoint: ThemeStrength;
  @Input() previouslySelectedKnacks: Knack[];
  magicType = MagicType;
  /**
   * a toggle switch to determine if knacks are being displayed or not
   */
  knackDisplayToggle: boolean;
  /**
   * the number of knacks a character can select
   */
  numberOfKnacksToSelect: number;
  /**
   * maintains an array of knacks that have been selected
   */
  selectedKnacks: Knack[];
  /**
   * maintains an array of knacks that are toggled open
   */
  openKnacks: Knack[];

  constructor() {
    this.knackDisplayToggle = false;
    this.selectedKnacks = [];
    this.openKnacks = [];
  }

  ngOnInit() {
    if (this.previouslySelectedKnacks) {
      this.selectedKnacks = this.previouslySelectedKnacks;
    }
    this.determineNumberOfSelectableKnacks();
  }

  ngOnChanges() {
    this.determineNumberOfSelectableKnacks();
  }

  displayKnacks() {
    this.knackDisplayToggle = !this.knackDisplayToggle;
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

  isKnackSelected(knack: Knack) {
    return this.findIndexOfKnackByName(knack, this.selectedKnacks) > -1;
  }

  selectKnack(knack: Knack) {
    if (this.selectedKnacks.length < this.numberOfKnacksToSelect) {
      this.selectedKnacks.push(knack);
    } else {
      const index = this.findIndexOfKnackByName(knack, this.selectedKnacks);
      if (index > -1) {
        this.selectedKnacks.splice(index, 1);
      }
    }
  }

  getMagicText(propertyName: MagicType): string {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
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
        text: knacksObject[knack]
      });
    }
    return result;

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
    this.numberOfKnacksToSelect = 0;
    if (this.generalThemePoint > 0) {
      this.numberOfKnacksToSelect++;
    }
    if (this.subtheme.maxThemeStrength === ThemeStrength.Greater) {
      this.numberOfKnacksToSelect++;
    }
  }
}


