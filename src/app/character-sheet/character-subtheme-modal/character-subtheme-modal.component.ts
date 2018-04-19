import {Component, Input, OnInit} from '@angular/core';
import {Subtheme} from "../../shared/theme-points/subthemes/subtheme";
import {SubthemeTypes} from "../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";

@Component({
  selector: 'corps-character-subtheme-container',
  templateUrl: './character-subtheme-modal.component.html',
  styleUrls: ['./character-subtheme-modal.component.css']
})
export class CharacterSubthemeModalComponent implements OnInit {

  @Input() subthemePoints: SubthemeContainer;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  getAllPossibleSubthemes(): Subtheme[] {
    const result: Subtheme[] = [];
    if (this.subthemePoints.themePoints.combat.getStrength() > 0) {
      result.push(new Subtheme(SubthemeTypes.Weapon_Specialization, ThemeStrength.None));
      result.push(new Subtheme(SubthemeTypes.Protector, ThemeStrength.None));
      result.push(new Subtheme(SubthemeTypes.Juggernaut, ThemeStrength.None));
    }
    if (this.subthemePoints.themePoints.stealth.getStrength() > 0) {
      result.push(new Subtheme(SubthemeTypes.Find_Weakness, ThemeStrength.None));
      result.push(new Subtheme(SubthemeTypes.Riposte, ThemeStrength.None));
      result.push(new Subtheme(SubthemeTypes.Evasion, ThemeStrength.None));
    }
    return result;
  }

  getAssignedSubthemes(): number {
    return 0;
  }

  selectedSubtheme(): Subtheme {
    return new Subtheme(SubthemeTypes.Protector, ThemeStrength.None);
  }

  updateSubtheme(updatedSubtheme: Subtheme) {

  }


}
