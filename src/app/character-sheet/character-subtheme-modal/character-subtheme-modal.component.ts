import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Subtheme} from "../../shared/theme-points/subthemes/subtheme";
import {SubthemeTypes} from "../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {ThemeType} from "../../shared/theme-points/theme-type.enum";


@Component({
  selector: 'corps-character-subtheme-container',
  templateUrl: './character-subtheme-modal.component.html',
  styleUrls: ['./character-subtheme-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterSubthemeModalComponent implements OnInit {

  @Input() subthemePoints: SubthemeContainer;
  subthemeButtonsArray: Subtheme[];
  themeType = ThemeType;
  selectedSubtheme: Subtheme;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    console.log("Out subthemePoints container at init of modal", this.subthemePoints);
    this.getAllPossibleSubthemes();
    this.selectedSubtheme = this.subthemeButtonsArray[0];
  }

  /**
   * gets all available subthemes based on potentally available theme points.  Thus if the original themepoints container has 1 or more theme points in combat, stealth or magic, each will respectively return all subthemes that could potentally be selected.  If subtheme points have already been assigned to aparticular subtheme then this should be reflected in the array that is passed back.
   * @returns {Subtheme[]}
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

  getAssignedSubthemes(): number {
    return 0;
  }



  updateSubtheme(updatedSubtheme: Subtheme) {

  }

  close() {
    this.activeModal.close(this.subthemePoints);
  }

  dismiss() {
    this.activeModal.dismiss("Uer Cancelled");
  }


}
