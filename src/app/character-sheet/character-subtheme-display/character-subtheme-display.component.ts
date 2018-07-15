import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {ThemeType} from "../../shared/theme-points/theme-type.enum";

@Component({
  selector: 'corps-character-subtheme-display',
  templateUrl: './character-subtheme-display.component.html',
  styleUrls: ['./character-subtheme-display.component.css']
})
export class CharacterSubthemeDisplayComponent implements OnInit {

  @Input() previouslySelectedSubthemeContainer: SubthemeContainer;
  @Output() openSubtheme: EventEmitter<Event>;

  constructor() {
    this.openSubtheme = new EventEmitter<Event>();
  }

  ngOnInit() {
  }

  launchModal() {
    this.openSubtheme.emit(new Event('click'));
  }

  displayCombatSubthemeNames(): string[] {
    return this.getSubthemeNames("combat");
  }

  displayStealthSubthemeNames(): string[] {
    return this.getSubthemeNames("stealth");
  }

  /**'
   * returns false if subthemes have been selected or true if the subthemes are empty
   * @returns {boolean}
   */
  areSubthemesEmpty(): boolean {
    if (this.previouslySelectedSubthemeContainer) {
      return this.isCombatEmpty() && this.isStealthEmpty() && this.isMagicEmpty();
    } else {
      return true;
    }
  }

  isCombatEmpty(): boolean {
    return this.previouslySelectedSubthemeContainer.combat.length === 0;
  }

  isStealthEmpty(): boolean {
    return this.previouslySelectedSubthemeContainer.combat.length === 0;
  }

  isMagicEmpty(): boolean {
    return this.previouslySelectedSubthemeContainer.magic === null;
  }

  /**
   * returns an array of subtheme names formatted with string that matches a property name inside of the subtheme container object
   * @param {string} subthemeName
   * @returns {string[]}
   */
  private getSubthemeNames(subthemeName: string): string[] {
    const names = [];
    if (this.previouslySelectedSubthemeContainer) {
      for (const name of this.previouslySelectedSubthemeContainer[subthemeName]) {
        const displayName = name.themeStrength + " " + name.pipe.transform(name.subthemeName);
        names.push(displayName);
      }
    }
    return names;
  }


}
