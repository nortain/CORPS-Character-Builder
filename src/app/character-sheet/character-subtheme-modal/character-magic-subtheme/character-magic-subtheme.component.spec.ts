import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMagicSubthemeComponent } from './character-magic-subtheme.component';
import {mockCharacter, mockSubtheme} from "../../../shared/constants/testing-constants";
import {SubthemeTypes} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {MagicType} from "./magic-type.enum";
import {ONE_MAGIC_SPELLS} from "../../../shared/constants/constants";

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
    const result = component.getMagicText(MagicType.FeatureBonus);
    expect(result).toBe(ONE_MAGIC_SPELLS["Magent"].FeatureBonus);
  });

  it('should be able to get knackData', () => {
    const result = component.getKnackData("CarpetBagger");
    expect(result).toEqual(ONE_MAGIC_SPELLS["Magent"].ImplementKnacksData.Carpetbagger);
  });

  it('should be able to get knackText', () => {
    const result = component.getKnackText()[0];
    expect(result.name).toEqual("RangedDefender");
    expect(result.text).toEqual(ONE_MAGIC_SPELLS["Magent"].ImplementKnacks.RangedDefender);
  });

  it('should not display a data table if no data is presented', () => {
    expect(true).toBeFalsy();
  });

});
