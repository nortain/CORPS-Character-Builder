import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {Character} from "../character/character";
import {RaceType} from "../character/race/race-type.enum";
import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";
import {PhysicalDefense} from "../character/phsyical-defense/physical-defense";

export function mockDropdownData() {
  return [
    {value: 3, label: "bob"},
    {value: 5, label: "moe"},
    {value: -1, label: "tom"}
  ] as DropdownValueObject[];
}

export function mockCharacter(name = "Bob", raceType = RaceType.Altwani) {
  const character = new Character(name, raceType);
  return character;
}

export function mockDefense() {
  return new PhysicalDefense();
}

/**This helper function for testing.
It will click on a dropdown button matching the selector string and then choose the xth dropdown menu item.
If the xth item doesn't exist an error is thrown.
This will also update UI after the button click has been performed.*/
export function actionClickDropdownItemX(fixture: ComponentFixture<any>, selector: string, x = 0) {
  const dropdown = fixture.debugElement.query(By.css(selector));
  const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
  dropdownBtn.click();
  const menuItem = dropdown.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
  menuItem[x].nativeElement.click();
  fixture.detectChanges();
}
