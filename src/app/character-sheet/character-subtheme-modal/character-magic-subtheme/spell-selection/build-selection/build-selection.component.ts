import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemeStrength} from "../../../../../shared/theme-points/theme-strength.enum";
import {Subtheme} from "../../../../../shared/theme-points/subthemes/subtheme";
import {Spell} from "../../../../../shared/spells/spell";
import {SpellSelectionType} from "../../magic-type.enum";
import {AreaOfEffectService} from "../../../../../shared/area-of-effect/area-of-effect.service";
import {SpecialPower} from "../../../../../shared/constants/constants";
import {ActionService} from "../../../../../shared/action/action.service";
import {SpellRequirement} from "../../../../../shared/spells/enums/spell-requirement.enum";

@Component({
  selector: 'corps-build-selection',
  templateUrl: './build-selection.component.html',
  styleUrls: ['./build-selection.component.css']
})
export class BuildSelectionComponent implements OnInit {

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
  @Input() previouslySelectedBuild: SpecialPower;
  @Input() isSpecialOnly: SpellRequirement;
  @Input() buildsToChooseFrom: SpecialPower[];

  /**
   * This is the text value of how we are referring to this property, if no value is given then we default to Spell
   */
  @Input() propertyName: string;
  /**
   * output the subtheme and the selected spells with it
   */
  @Output() submitter: EventEmitter<{ subtheme: Subtheme, power: SpecialPower }>;
  /**
   * toggle to determine if content is displayed
   */
  selectionDisplayToggle: boolean;


  /**
   * maintain an array of spells that are selected
   */
  selectedBuild: SpecialPower;
  /**
   * maintain an array of which spells are open
   */
  openBuilds: SpecialPower[];


  propertyType = SpellSelectionType.SpecialPowers;
  vowelRegex = /[aeiou]/;

  constructor(private aoeService: AreaOfEffectService, private actionService: ActionService) {
    this.selectionDisplayToggle = false;
    this.resetSpellSelection();
  }

  /**
   * if no property name default to build
   * If no previously selected build make sure selectedBuild is null otherwise make selected = previouslySelected
   */
  ngOnInit() {
    if (!this.propertyName) {
      this.propertyName = "Build";
    }
    if (this.previouslySelectedBuild) {
      for (const build of this.buildsToChooseFrom) {
        if (build.name === this.previouslySelectedBuild.name) {
          this.selectedBuild = this.previouslySelectedBuild;
          break;
        }
      }
    }
    if (!this.selectedBuild) {
      this.selectedBuild = null;
    }
  }

  isThisDirty(): boolean {
    const dirty = this.selectedBuild !== null;
    return dirty;
  }

  /**
   * clears out all selected and open spells
   */
  resetSpellSelection() {
    this.selectedBuild = null;
    this.openBuilds = [];
  }

  displayBuilds() {
    this.selectionDisplayToggle = !this.selectionDisplayToggle;
  }

  isSubthemeSelected() {
    return this.subtheme.themeStrength !== ThemeStrength.None;
  }


  openBuild(build: SpecialPower) {
    const index = this.findIndexOfBuildByName(build, this.openBuilds);
    if (index > -1) {
      this.openBuilds.splice(index, 1);
    } else {
      this.openBuilds.push(build);
    }
  }

  isBuildOpen(build: SpecialPower) {
    return this.findIndexOfBuildByName(build, this.openBuilds) > -1;
  }

  /**
   * returns true if the given build is selected by matching on name, otherwise it's false
   * @param {SpecialPower} build
   * @returns {boolean}
   */
  isBuildSelected(build: SpecialPower): boolean {
    if (this.selectedBuild) {
      return build.name === this.selectedBuild.name;
    }
    return false;

  }

  getCastActionString(actionType) {
    return this.actionService.getActionAsString(actionType);
  }

  getAOEString(spell: Spell) {
    return this.aoeService.displayAOE(spell.areaOfEffect);
  }

  selectBuild(build: SpecialPower) {
    if (!this.selectedBuild) {
      this.selectedBuild = build;
    } else {
      if (this.isBuildSelected(build)) {
        this.selectedBuild = null;
      }
    }
  }

  isValidBuild(build: SpecialPower): boolean {
    if (this.isSpecialOnly !== null) {
      return build.requirement === SpellRequirement.Special;
    }
    if (build.requirement === SpellRequirement.Always) {
      return true;
    }
    if (this.generalThemePoint === ThemeStrength.None) {
      return build.requirement === SpellRequirement.ZeroGeneral;
    } else {
      return build.requirement === SpellRequirement.OneGeneral;
    }


  }


  private findIndexOfBuildByName(element: SpecialPower, array: SpecialPower[]): number {
    for (const index of Object.keys(array)) {
      if (element.name === array[index].name) {
        return parseInt(index, 10);
      }
    }
    return -1;
  }
}
