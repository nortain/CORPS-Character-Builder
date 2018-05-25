import {Component, Input, OnInit} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {MagicType} from "./magic-type.enum";

@Component({
  selector: 'corps-character-magic-subtheme',
  templateUrl: './character-magic-subtheme.component.html',
  styleUrls: ['./character-magic-subtheme.component.css']
})
export class CharacterMagicSubthemeComponent implements OnInit {

  @Input() subtheme: Subtheme;
  magicType = MagicType;
  knackDisplayToggle: boolean;

  constructor() {
    this.knackDisplayToggle = false;
  }

  ngOnInit() {
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

  getKnackText(): {name: string, text: string}[] {
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
}
