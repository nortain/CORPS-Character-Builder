import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSubthemeModalComponent} from './character-subtheme-modal.component';
import {SharedModule} from "../../shared/shared.module";
import {SubthemeComponent} from "./character-subthemes/subtheme.component";
import {NgbActiveModal, NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {actionClickDropdownItemX, actionGetDropdownValue, mockThemePoints} from "../../shared/constants/testing-constants";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {SubthemeTypes} from "../../shared/theme-points/subthemes/subtheme-types.enum";
import {Subtheme} from "../../shared/theme-points/subthemes/subtheme";
import {By} from "@angular/platform-browser";
import {DropdownComponent} from "../../shared/ui/dropdown/dropdown.component";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";

describe('CharacterSubthemeModalComponent', () => {
  let component: CharacterSubthemeModalComponent;
  let fixture: ComponentFixture<CharacterSubthemeModalComponent>;
  let weapon, protector, juggernaut, find, riposte, evasion;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SubthemeComponent, CharacterSubthemeModalComponent],
      providers: [NgbDropdownConfig, NgbActiveModal, NgbModalStack]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSubthemeModalComponent);
    component = fixture.componentInstance;
    component.subthemePoints = new SubthemeContainer(mockThemePoints());
    component.getAllPossibleSubthemes();
    weapon = new Subtheme(SubthemeTypes.WeaponSpecialization, 0);
    protector = new Subtheme(SubthemeTypes.Protector, 0);
    juggernaut = new Subtheme(SubthemeTypes.Juggernaut, 0);
    find = new Subtheme(SubthemeTypes.FindWeakness, 0);
    riposte = new Subtheme(SubthemeTypes.Riposte, 0);
    evasion = new Subtheme(SubthemeTypes.Evasion, 0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get all possible subthemes when combat is the only possible subthemes available', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(ThemeStrength.Minor, 0, 0, 0));

    fixture.detectChanges();
    component.getAllPossibleSubthemes();
    expect(component.subthemeButtonsArray).toEqual([
      weapon, protector, juggernaut
    ]);
  });

  it('should be able to get all possible subthemes when stealth is the only possible subthemes available', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(0, 1, 0, 1));
    component.getAllPossibleSubthemes();
    expect(component.subthemeButtonsArray).toEqual([
      find, riposte, evasion
    ]);
  });

  it('should be able to load in subthemes that have already been assigned values', () => {
    const sc = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    sc.assignSubtheme(new Subtheme(SubthemeTypes.Protector, ThemeStrength.Lesser));
    component.subthemePoints = sc;
    component.getAllPossibleSubthemes();

    let btn = fixture.debugElement.queryAll(By.css("#Protector"));
    btn[0].nativeElement.click();
    fixture.detectChanges();
    btn = fixture.debugElement.queryAll(By.css("#Protector"));
    expect(btn[0].nativeElement).toBeTruthy();
    expect(btn[0].nativeElement.innerText).toContain("Ranks: 2");
  });

  // TODO need to test passing in varous sub themes

  it('should load up the subtheme that is first in the array of subthemes', () => {
    const subComponent = fixture.debugElement.query(By.directive(SubthemeComponent));
    expect(subComponent.nativeElement).toBeTruthy();
    const name = subComponent.queryAll(By.css("label"));
    expect(name[0].nativeElement.innerText).toBe("Subtheme Name: Weapon Specialization");
  });

  it('should be able to switch subthemes displayed in subtheme component', () => {
    const buttons = fixture.debugElement.queryAll(By.css("button.verticalSubthemeBtns"));
    expect(buttons.length).toEqual(8);
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedSubtheme).toBe(component.subthemeButtonsArray[1]);

  });

  it('should reset the theme strength dropdown to the value of that particular subtheme', () => {
    const buttons = fixture.debugElement.queryAll(By.css("button.verticalSubthemeBtns"));
    const dropdownValue = actionGetDropdownValue(fixture, "#subthemeDropdown");
    expect(dropdownValue).toBe("0");

    actionClickDropdownItemX(fixture, "#subthemeDropdown", 1);

    expect(actionGetDropdownValue(fixture, "#subthemeDropdown")).toBe("1");
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(actionGetDropdownValue(fixture, "#subthemeDropdown")).toBe("0");
  });

  fit('should prevent a character from assigning more subtheme points across all subthemes of a paritciular type than they have available', () => {
    const dropdown = fixture.debugElement.query(By.css("#subthemeDropdown"));
    const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
    dropdownBtn.click();
    const menuItems = dropdown.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(menuItems.length).toEqual(2);
  });


});
