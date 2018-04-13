import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSheetComponent} from './character-sheet.component';
import {SharedModule} from "../shared/shared.module";
import {NgbDropdown, NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {actionClickDropdownItemX, mockCharacter} from "../shared/constants/testing-constants";
import {RaceType} from "../shared/character/race/race-type.enum";
import {Level} from "../shared/character/level.enum";
import {By} from "@angular/platform-browser";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";

import {RacialSubType} from "../shared/character/race/racial-sub-type.enum";
import {CharacterSheetModule} from "./character-sheet.module";
import {ThemeStrength} from "../shared/theme-points/theme-strength.enum";
import {AttributeStrength} from "../shared/attribute/attribute-strength.enum";

describe('CharacterSheetComponent', () => {
  let component: CharacterSheetComponent;
  let fixture: ComponentFixture<CharacterSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, CharacterSheetModule],
      declarations: [],
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
    component.reloadCharacter("raceType", RaceType.Burman);
    component.reloadCharacter("level", Level.Two);
    expect(component.character).not.toEqual(mockCharacter());
    expect(component.character.name).toBe("Bob");
    expect(component.character.raceType).toEqual(RaceType.Burman);
    expect(component.character.level).toEqual(2);
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
    const subType = component.character.racialSubType;
    expect(RacialSubType[subType]).toEqual(RacialSubType.Air);
  });

  it('should set sub race to null if the race does not have a subrace', function () {
    actionClickDropdownItemX(fixture, "#characterRace", 7);
    actionClickDropdownItemX(fixture, "#characterSubRace", 1);
    actionClickDropdownItemX(fixture, "#characterRace", 5);
    expect(component.character.racialSubType).toBeNull();
  });

  it('should be able to get hit points for a character', () => {
    expect(component.getHitPointsValue()).toEqual(40);
  });

  it('should be able to get hit points for a character with ranks in theme points', () => {
    component.character.themePoints.combat.setStrength(ThemeStrength.Lesser);
    expect(component.getHitPointsValue()).toEqual(44);
    component.character.themePoints.stealth.setStrength(ThemeStrength.Minor);
    expect(component.getHitPointsValue()).toEqual(45);
  });

  it('should be able to get hit points when a character has ranks in vitality', () => {
    component.character.attributes.Vitality.strength = AttributeStrength.Champion;
    expect(component.getHitPointsValue()).toEqual(48);

  });

});
