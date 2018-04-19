import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSubthemeModalComponent} from './character-subtheme-modal.component';
import {SharedModule} from "../../shared/shared.module";
import {SubthemeComponent} from "./character-subthemes/subtheme.component";
import {NgbActiveModal, NgbDropdownConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {mockThemePoints} from "../../shared/constants/testing-constants";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";
import {ThemePointsContainer} from "../../shared/theme-points/theme-points-container";
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {SubthemeTypes} from "../../shared/theme-points/subthemes/subtheme-types.enum";
import {Subtheme} from "../../shared/theme-points/subthemes/subtheme";

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
    weapon = new Subtheme(SubthemeTypes.Weapon_Specialization, 0);
    protector = new Subtheme(SubthemeTypes.Protector, 0);
    juggernaut = new Subtheme(SubthemeTypes.Juggernaut, 0);
    find = new Subtheme(SubthemeTypes.Find_Weakness, 0);
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
    expect(component.getAllPossibleSubthemes()).toEqual([
      weapon, protector, juggernaut
    ]);
  });

  it('should be able to get all possible subthemes when stealth is the only possible subthemes available', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(0, 1, 1, 1));
    expect(component.getAllPossibleSubthemes()).toEqual([
      find, riposte, evasion
    ]);
  });

  it('should be able to load in subthemes that have already been assigned values', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    // component.subthemePoints.assignSubtheme()
  });


});
