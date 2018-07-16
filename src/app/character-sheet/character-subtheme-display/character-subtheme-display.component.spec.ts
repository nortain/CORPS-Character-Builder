import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterSubthemeDisplayComponent} from './character-subtheme-display.component';
import {SubthemeContainer} from "../../shared/theme-points/subthemes/subtheme-container";
import {mockSubtheme, mockSubthemeContainer} from "../../shared/constants/testing-constants";
import {ThemeType} from "../../shared/theme-points/theme-type.enum";
import {SubthemeType} from "../../shared/theme-points/subthemes/subtheme-type.enum";
import {ThemeStrength} from "../../shared/theme-points/theme-strength.enum";

fdescribe('CharacterSubthemeDisplayComponent', () => {
  let component: CharacterSubthemeDisplayComponent;
  let fixture: ComponentFixture<CharacterSubthemeDisplayComponent>;
  let subContainer: SubthemeContainer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterSubthemeDisplayComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSubthemeDisplayComponent);
    component = fixture.componentInstance;
    subContainer = mockSubthemeContainer();
    component.previouslySelectedSubthemeContainer = subContainer;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to display all subthemes', () => {
    const mag = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    const rip = mockSubtheme(SubthemeType.Riposte, ThemeStrength.Minor);
    const wep = mockSubtheme(SubthemeType.WeaponSpecialization, ThemeStrength.Minor);
    component.previouslySelectedSubthemeContainer.assignSubtheme(mag);
    component.previouslySelectedSubthemeContainer.assignSubtheme(rip);
    component.previouslySelectedSubthemeContainer.assignSubtheme(wep);
    const result = ["(1)Weapon Specialization", "(1)Riposte", "Magent"];
    component.displayAllSubthemes().forEach((value, index) => {
      expect(value).toBe(result[index]);
    });
  });
});
