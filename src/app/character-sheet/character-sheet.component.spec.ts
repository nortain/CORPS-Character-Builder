import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdown, NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {actionClickDropdownItemX, mockCharacter} from "../shared/constants/testing-constants";
import {RaceType} from "../shared/character/race/race-type.enum";
import {Level} from "../shared/character/level.enum";
import {Character} from "../shared/character/character";
import {By} from "@angular/platform-browser";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";
import {CharacterThemePointsComponent} from "./character-theme-points/character-theme-points.component";
import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [CharacterSheetComponent, CharacterThemePointsComponent],
      providers: [NgbDropdownConfig]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to reload a character', () => {
    component.character.name = "Bob";
    expect(component.character).toEqual(mockCharacter());
    component.reloadCharacter(RaceType.Burman, Level.Two);
    expect(component.character).not.toEqual(mockCharacter());
    expect(component.character).toEqual(new Character("Bob", RaceType.Burman, Level.Two));
  });

  it('should be able to set character name via the input component', function () {
    expect(component.character.name).toBe("");
    const nameInput = fixture.debugElement.query(By.css("input#NameId")).nativeElement;
    nameInput.value = "Bob";
    nameInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    expect(component.character.name).toBe("Bob");
  });

  it('should be able to reload a new character when modifying the race dropdown', () => {
    const raceDD = fixture.debugElement.query(By.css("#characterRace"));
    const raceDDButton = raceDD.query(By.directive(NgbDropdown)).query(By.css("button")).nativeElement;
    raceDDButton.click();
    fixture.detectChanges();
    const raceDDItem = raceDD.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(raceDDItem.length).toBe(8);
    raceDDItem[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.character.raceType).toBe(RaceType.Elder);
  });

  it('should be able to reload a new character when modifying the level dropdown', () => {
    const levelDD = fixture.debugElement.query(By.css("#characterLevel"));
    const levelDDButton = levelDD.query(By.directive(NgbDropdown)).query(By.css("button")).nativeElement;
    levelDDButton.click();
    fixture.detectChanges();
    const levelDDItem = levelDD.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(levelDDItem.length).toBe(10);
    levelDDItem[2].nativeElement.click();
    fixture.detectChanges();
    expect(component.character.level).toBe(3);
  });

  it('should be able to update the theme points in the UI and see those changes reflected in the character data model', () => {
    actionClickDropdownItemX(fixture, "#combat", 1);
    expect(component.character.themePoints.combat.getStrength()).toBe(1);
  });

  it('should be able to select a racial subtype when choosing a primental', function () {
    actionClickDropdownItemX(fixture, "#characterRace", 7);
    actionClickDropdownItemX(fixture, "#characterSubRace", 1);
    expect(component.character.racialSubType).toEqual(RacialSubType[RacialSubType.Air]);
  });

  it('should set sub race to null if the race does not have a subrace', function () {
    actionClickDropdownItemX(fixture, "#characterRace", 7);
    actionClickDropdownItemX(fixture, "#characterSubRace", 1);
    actionClickDropdownItemX(fixture, "#characterRace", 5);
    expect(component.character.racialSubType).toBeNull();
  });


});
