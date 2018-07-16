import {ChangeDetectionStrategy, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubthemeContainer} from "../../../shared/theme-points/subthemes/subtheme-container";
import {ThemeType} from "../../../shared/theme-points/theme-type.enum";
import {CasterBuild, Knack} from "../../../shared/constants/constants";
import {Level} from "../../../shared/character/level.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";


@Component({
  selector: 'corps-character-subtheme-container',
  templateUrl: './character-subtheme-modal.component.html',
  styleUrls: ['./character-subtheme-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSubthemeModalComponent implements OnInit {

  @Input() subthemePoints: SubthemeContainer;
  @Input() characterLevel: Level;
  subthemeButtonsArray: Subtheme[];
  themeType = ThemeType;

  // Currently Loaded Subtheme
  viewedSubtheme: Subtheme;

  selectedMagicSubtheme: Subtheme;

  // this feels like a hacky way of dealing with the model not updating but each time a new subtheme is selected these are to be toggled back forth.
  subthemeToggle: boolean;


  constructor(private activeModal: NgbActiveModal) {
    this.subthemeToggle = true;
  }

  ngOnInit() {
    this.getAllPossibleSubthemes();
    this.viewedSubtheme = this.subthemeButtonsArray[0];
    if (this.subthemePoints && this.subthemePoints.magic) {
      this.updateSubtheme(this.subthemePoints.magic);
      this.viewedSubtheme = this.subthemeButtonsArray[0];
    }
  }

  /**
   * gets all available subthemes based on potentally available theme points.  Thus if the original themepoints container has 1 or more theme points in combat, stealth or magic, each will respectively return all subthemes that could potentally be selected.  If subtheme points have already been assigned to aparticular subtheme then this should be reflected in the array that gets assigned to subthemeButtonsArray
   *
   */
  getAllPossibleSubthemes() {

    const subthemeObject = this.subthemePoints.buildSubthemeObject();
    let result = [];
    result = this.pruneSubthemes(subthemeObject.combat, result);
    result = this.pruneSubthemes(subthemeObject.stealth, result);
    result = this.pruneSubthemes(subthemeObject.magic, result);

    this.subthemeButtonsArray = result;
  }

  private pruneSubthemes(subArray: Subtheme[], resultArray: Subtheme[]) {
    if (subArray && subArray.length > 0) {
      resultArray = [...resultArray, ...subArray];
    }
    return resultArray;
  }

  getViewedSubthemeStrength(): number {
    return this.viewedSubtheme.themeStrength;
  }

  /**
   * this is called whenever a selection to the currently selected subtheme is made.
   * @param {Subtheme} updatedSubtheme
   */
  updateSubtheme(updatedSubtheme: Subtheme) {
    if (updatedSubtheme !== null) {
      for (const sub of this.subthemeButtonsArray) {
        const alreadyChoosenButNowDeselecting = sub.themeStrength > ThemeStrength.None && sub.subthemeName === updatedSubtheme.subthemeName && updatedSubtheme.themeStrength === ThemeStrength.None;

        const themeNamesMatchAndThemeIsBeingSelectedBecauseStrengthIsNotZero = sub.subthemeName === updatedSubtheme.subthemeName && updatedSubtheme.themeStrength !== ThemeStrength.None;

        if (themeNamesMatchAndThemeIsBeingSelectedBecauseStrengthIsNotZero
          || alreadyChoosenButNowDeselecting) {
          const index = this.subthemeButtonsArray.indexOf(sub);
          this.subthemeButtonsArray[index] = updatedSubtheme;
          this.subthemePoints.assignSubtheme(updatedSubtheme);
          this.viewedSubtheme = updatedSubtheme;
          if (updatedSubtheme.themeType === ThemeType.Magic) {
            this.selectedMagicSubtheme = updatedSubtheme;
          }
          break;
        }
      }
    }
  }

  /**
   * this will get the subtheme cap point which is to say the maximum number of theme points that can the currently selected subtheme
   * @returns {number}
   */
  getSubthemePointCap(): number {
    const themeType = ThemeType[this.viewedSubtheme.themeType].toLowerCase();
    let maximumSubthemeStrength = this.subthemePoints.themePoints[themeType].getStrength();
    for (const sub of this.subthemeButtonsArray) {
      if (sub.subthemeName !== this.viewedSubtheme.subthemeName
        && sub.themeType === this.viewedSubtheme.themeType) {
        maximumSubthemeStrength -= sub.themeStrength;
      }
    }
    return maximumSubthemeStrength;
  }


  viewSubtheme(selectedSubtheme: Subtheme) {
    this.viewedSubtheme = selectedSubtheme;
    if (this.selectedMagicSubtheme) {
      if (this.viewedSubtheme.subthemeName === this.selectedMagicSubtheme.subthemeName) {
        this.viewedSubtheme = this.selectedMagicSubtheme;
      }
    }
    this.subthemeToggle = !this.subthemeToggle;
  }

  close() {
    if (this.selectedMagicSubtheme) {
      this.subthemePoints.magic = this.selectedMagicSubtheme;
    }

    this.activeModal.close(this.subthemePoints);
  }

  dismiss() {
    this.activeModal.dismiss("User Cancelled");
  }


}
