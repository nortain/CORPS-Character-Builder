import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {DropdownValueObject} from "../../../shared/ui/dropdown/dropdown-value-object";
import {AttributeService} from "../../../shared/attribute/attribute.service";
import {SubthemeTypes} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeType} from "../../../shared/theme-points/theme-type.enum";
import {STARTING_THEME_POINTS, SUBTHEME_BONUS} from "../../../shared/constants/constants";
import {DropdownComponent} from "../../../shared/ui/dropdown/dropdown.component";


@Component({
  selector: 'corps-subthemes',
  templateUrl: './subthemes.component.html',
  styleUrls: ['./subthemes.component.css']
})
export class SubthemeComponent implements OnInit {

  @ViewChild(DropdownComponent) dropdown: DropdownComponent;
  @Input() subtheme: Subtheme;
  @Input() assignedSubthemePoints: number; // could be between 0 and 4
  @Output() submitter: EventEmitter<Subtheme>;


  themeType = ThemeType;


  constructor(private  attributeService: AttributeService) {
    this.submitter = new EventEmitter<Subtheme>();
    console.log("subtheme component was created");
  }

  ngOnInit() {
    console.log("subtheme component was initialized");
  }

  getTextInfo(): string[] {
    return SUBTHEME_BONUS[this.subtheme.getSubthemeName()].text;
  }




  /**
   * gets an array of arrays to represent the values that are gained from the sub theme and displayed in the subtheme component
   */
  getTableData() {
    const rows = [];
    let length = 1;
    while (length <= this.subtheme.getMaxThemeStrength()) {
      rows.push(SUBTHEME_BONUS[this.subtheme.getSubthemeName()][length]);
      length++;
    }
    return rows;
  }

  /**
   * takes in a object and return an array of strings that represent the keys of that object
   * @param table
   * @returns {string[]}
   */
  getRowHeader(table: object): string[] {
    const rows = Object.keys(table);
    return rows;
  }

  /**
   * takes in an object and a rowName which should be a property of that object and this returns the value of the property name in the passed in object.
   * @param table
   * @param rowName
   * @returns {any}
   */
  getRowData(table, rowName) {
    const value = table[rowName];
    return value.length === 1 ? ' ' + value : value;
  }


  loadSelectedDropdownValue(): DropdownValueObject {
    const newDD = new DropdownValueObject(this.subtheme.themeStrength);
    this.dropdown.selectDropdown(newDD);
    return newDD;
  }

  /**
   * returns a number indicating how many sub theme points are left to assign towards this particular sub theme.
   * @returns {number}
   */
  getRemainingSubthemePointsToAssign(): number {
    const total = this.getTotalSubthemePoints();
    return total - this.subtheme.themeStrength;
  }

  /**
   * return the total number of sub theme points that can be assigned to this sub theme.
   * @returns {number}
   */
  getTotalSubthemePoints(): number {
    const base = this.subtheme.getMaxThemeStrength();
    const assigned = this.assignedSubthemePoints - this.subtheme.getThemeStrength();
    let result;
    if (assigned < base) {
      result = STARTING_THEME_POINTS - assigned;
    }
    return result > base ? base : result;
  }

  /**
   * assigns a new subtheme object whenever the strength value of the subtheme is changed
   * @param {DropdownValueObject} dd
   */
  reloadSubtheme(dd: DropdownValueObject) {
    this.subtheme = new Subtheme(SubthemeTypes[this.subtheme.getSubthemeName()], dd.value);
    this.submitter.emit(this.subtheme);
  }

  /**
   * returns an array of dropdownvalue objects that are used to populate the subtheme modal window.  This dropdown will be responsible for assigned how many available subtheme points are assigned to this particular subtheme.
   * @returns {DropdownValueObject[]}
   */
  getDropdownValues(): DropdownValueObject[] {
    const max = 4 - this.subtheme.getMaxThemeStrength();
    let pointsAssignedElsewhere = this.assignedSubthemePoints - this.subtheme.getThemeStrength();
    pointsAssignedElsewhere = pointsAssignedElsewhere < max ? max : pointsAssignedElsewhere;
    const result = this.attributeService.buildArrayAsDropdownArray(this.attributeService.getThemePointStrength(false, pointsAssignedElsewhere));
    console.log(result, " is the result.");
    return result;
  }


}
