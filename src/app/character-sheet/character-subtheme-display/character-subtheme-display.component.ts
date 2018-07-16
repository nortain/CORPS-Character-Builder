import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {ThemeType} from "../../shared/theme-points/theme-type.enum";
import {FirstLetterOnlyPipe} from "../../shared/pipes/first-letter-only.pipe";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";

@Component({
  selector: 'corps-character-subtheme-display',
  templateUrl: './character-subtheme-display.component.html',
  styleUrls: ['./character-subtheme-display.component.css']
})
export class CharacterSubthemeDisplayComponent implements OnInit {

  @Input() previouslySelectedSubthemeContainer: SubthemeContainer;
  @Output() openSubtheme: EventEmitter<Event>;

  firstLetterPipe: FirstLetterOnlyPipe;
  subthemeDisplayArray: string[];

  constructor() {
    this.openSubtheme = new EventEmitter<Event>();
    this.firstLetterPipe = new FirstLetterOnlyPipe();
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

  displayMagicSubthemeName(): string {
    if (this.previouslySelectedSubthemeContainer && this.previouslySelectedSubthemeContainer.magic) {
      const pipe = this.previouslySelectedSubthemeContainer.magic.pipe;
      return pipe.transform(this.previouslySelectedSubthemeContainer.magic.subthemeName);
    } else {
      return "";
    }
  }

  displayAllSubthemes(): string [] {
    const subs = [
      ...this.displayCombatSubthemeNames(),
      ...this.displayStealthSubthemeNames()
    ];
    const magic = this.displayMagicSubthemeName();
    if (magic.length > 0) {
      subs.push(magic);
    }
    return subs;


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
    return this.previouslySelectedSubthemeContainer.stealth.length === 0;
  }

  /**
   * returns true if magic is undefined or has a theme strength of 0, this indicates the subtheme is NOT selected and therefore empty.  Otherwise a magic subtheme has been selected and this returns false
   * @returns {boolean}
   */
  isMagicEmpty(): boolean {
    return !this.previouslySelectedSubthemeContainer.magic || this.previouslySelectedSubthemeContainer.magic.themeStrength === ThemeStrength.None;
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
        const displayName = "(" + name.themeStrength + ")" + name.pipe.transform(name.subthemeName);
        names.push(displayName);
      }
    }
    return names;
  }


}
