import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {SUBTHEME_BONUS} from "../../../shared/constants/constants";
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
  @Input() previouslySelectedKnacks: { name: string, text: string }[];
  magicType = MagicType;
  knackDisplayToggle: boolean;
  numberOfKnacksToSelect: number;
  selectedKnacks: { name: string, text: string }[];

  constructor() {
    this.knackDisplayToggle = false;
    this.selectedKnacks = [];
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


  getMagicText(propertyName: MagicType): string {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
  }

  getKnackData(knackName: string): number[] {
    const knacksObject = this.getMagicText(this.magicType.ImplementKnacksData);
    return knacksObject[knackName];
  }

  getKnackText(): { name: string, text: string }[] {
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

  selectKnack(knack: { name: string, text: string }) {
    if (this.selectedKnacks.length < this.numberOfKnacksToSelect) {
      this.selectedKnacks.push(knack);
    } else {
      const index = this.selectedKnacks.indexOf(knack);
      if (index > -1) {
        this.selectedKnacks.splice(index, 1);
      }
    }
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


