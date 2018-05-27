import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMagicSubthemeComponent } from './character-magic-subtheme.component';
import {mockCharacter, mockSubtheme} from "../../../shared/constants/testing-constants";
import {SubthemeTypes} from "../../../shared/theme-points/subthemes/subtheme-types.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {MagicType} from "./magic-type.enum";
import {ONE_MAGIC_SPELLS} from "../../../shared/constants/constants";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../../../shared/shared.module";

fdescribe('CharacterMagicSubthemeComponent', () => {
  let component: CharacterMagicSubthemeComponent;
  let fixture: ComponentFixture<CharacterMagicSubthemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ CharacterMagicSubthemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeTypes.Magent, ThemeStrength.Minor);
    component.knackDisplayToggle = true;
    component.generalThemePoint = ThemeStrength.None;
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
    const result = component.getKnackData("Carpetbagger");
    expect(result).toEqual(ONE_MAGIC_SPELLS["Magent"].ImplementKnacksData.Carpetbagger);
  });

  it('should be able to get knackText', () => {
    const result = component.getKnackText()[0];
    expect(result.name).toEqual("RangedDefender");
    expect(result.text).toEqual(ONE_MAGIC_SPELLS["Magent"].ImplementKnacks.RangedDefender);
  });

  it('should not display a data table if no data is presented', () => {
    const rdTable = fixture.debugElement.queryAll(By.css("#RangedDefenderTable"));
    const reprobateTable = fixture.debugElement.queryAll(By.css("#ReprobateTable"));
    expect(rdTable.length).toEqual(0);
    expect(reprobateTable.length).toEqual(1);
  });

  it('should display the knack names correctly', () => {
    const names = fixture.debugElement.queryAll(By.css(".name"));
    expect(names.length).toEqual(4);
    expect(names[0].nativeElement.innerText).toBe("Ranged Defender");
  });

  it('should display knack bonus in table correctly ', () => {
    const dataNames = fixture.debugElement.queryAll(By.css(".knackDataName"));
    expect(dataNames.length).toEqual(3);
    expect(dataNames[1].nativeElement.innerText).toBe("Elegant Retaliation");
  });

  it('should have an option to choose a knack if knacks are displayed', () => {
    // use select knack to select or deselect a knack
    component.numberOfKnacksToSelect = 1;
    const panels = fixture.debugElement.queryAll(By.css(".knackPanel"));
    expect(panels.length).toEqual(4);
    expect(component.selectedKnacks.length).toEqual(0);
    panels[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedKnacks.length).toEqual(1);
  });

  it('should alter the css to indicate a knack has been selected', () => {
    // add css to show a color of the div surrounding the knack if it is selected.
    expect(true).toBeFalsy();
  });

  it('should be able to determine how many knacks we can select', () => {
    expect(component.numberOfKnacksToSelect).toEqual(0);
    component.generalThemePoint = ThemeStrength.Minor;
    component.ngOnChanges();
    expect(component.numberOfKnacksToSelect).toEqual(1);
    component.subtheme = mockSubtheme(SubthemeTypes.Mage, ThemeStrength.Greater);
    component.ngOnChanges();
    expect(component.numberOfKnacksToSelect).toEqual(2);
  });

});
