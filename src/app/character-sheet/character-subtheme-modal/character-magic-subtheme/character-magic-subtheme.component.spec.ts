import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMagicSubthemeComponent } from './character-magic-subtheme.component';
import {mockCharacter, mockSubtheme} from "../../../shared/constants/testing-constants";
import {SubthemeTypes} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";

fdescribe('CharacterMagicSubthemeComponent', () => {
  let component: CharacterMagicSubthemeComponent;
  let fixture: ComponentFixture<CharacterMagicSubthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterMagicSubthemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeTypes.Magent, ThemeStrength.Minor);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get magic text', () => {
    expect(true).toBeFalsy();
  });

  it('should be able to get knackData', () => {
    expect(true).toBeFalsy();
  });

  it('should be able to get knackText', () => {
    expect(true).toBeFalsy();
  });

  it('should not display a data table if no data is presented', () => {
    expect(true).toBeFalsy();
  });

});
