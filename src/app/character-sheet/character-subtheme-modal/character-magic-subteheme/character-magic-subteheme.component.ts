import {Component, Input, OnInit} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {MagicType} from "./magic-type.enum";

@Component({
  selector: 'corps-character-magic-subteheme',
  templateUrl: './character-magic-subteheme.component.html',
  styleUrls: ['./character-magic-subteheme.component.css']
})
export class CharacterMagicSubtehemeComponent implements OnInit {

  @Input() subtheme: Subtheme;
  magicType = MagicType;

  constructor() { }

  ngOnInit() {
  }

  getMagicText(propertyName: MagicType): string {
    return SUBTHEME_BONUS[this.subtheme.subthemeName][propertyName];
  }

}
