import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharacterMagicSubthemeComponent} from './character-magic-subtheme.component';
import {mockCharacter, mockKnack, mockSubtheme} from "../../../shared/constants/testing-constants";
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
      declarations: [CharacterMagicSubthemeComponent]
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
    const headers = fixture.debugElement.queryAll(By.css(".card-header"));
    headers[0].nativeElement.click();
    headers[3].nativeElement.click();
    fixture.detectChanges();
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
    const headers = fixture.debugElement.queryAll(By.css(".card-header"));
    headers[2].nativeElement.click();
    fixture.detectChanges();
    const dataNames = fixture.debugElement.queryAll(By.css(".knackDataName"));
    expect(dataNames.length).toEqual(1);
    expect(dataNames[0].nativeElement.innerText).toBe("Elegant Retaliation");
  });

  it('should have an option to choose a knack if knacks are displayed', () => {
    // use select knack to select or deselect a knack
    component.numberOfKnacksToSelect = 1;
    const panels = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(panels.length).toEqual(4);
    expect(component.selectedKnacks.length).toEqual(0);
    panels[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.selectedKnacks.length).toEqual(1);
  });

  it('should alter the css to indicate a knack has been selected', () => {
    // add css to show a color of the div surrounding the knack if it is selected.
    component.numberOfKnacksToSelect = 1;
    let headers = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(headers.length).toEqual(4);
    headers[0].nativeElement.click();
    fixture.detectChanges();
    headers = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(headers[0].nativeElement.classList.contains("btn-success")).toBeTruthy();
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

  it('should be able to determine if a knack is open', () => {
    const mock = mockKnack();
    component.openKnacks.push(mock);
    expect(component.isKnackOpen(mock)).toBeTruthy();
  });

  it('should be able to open a knack', () => {
    const mock = mockKnack();
    component.openKnack(mock);
    expect(component.isKnackOpen(mock)).toBeTruthy();
  });

  it('should have an option to open a knack if they are displayed', () => {
    const knackHeaders = fixture.debugElement.queryAll(By.css('.card-header'));
    let knackTexts = fixture.debugElement.queryAll(By.css('.card-text'));
    expect(knackTexts.length).toEqual(0, "no cards should be open");
    knackHeaders[0].nativeElement.click();
    fixture.detectChanges();
    knackTexts = fixture.debugElement.queryAll(By.css('.card-text'));
    expect(knackTexts.length).toEqual(1, "only one card should be open");
  });

  it('should tell you what knack you have selected even if the knacks currently are not being displayed', () => {
    let selectorDisplay = fixture.debugElement.queryAll(By.css(".selectedKnackDisplay"));
    expect(selectorDisplay.length).toEqual(0);
    const mock = mockKnack();
    component.selectedKnacks.push(mock);
    fixture.detectChanges();
    selectorDisplay = fixture.debugElement.queryAll(By.css(".selectedKnackDisplay"));
    expect(selectorDisplay.length).toEqual(1);
    expect(selectorDisplay[0].nativeElement.innerText).toContain(mock.name);
  });

  it('should be able to actually selected a magic subtheme', () => {
    // should have a button that will let to you actually choose a particular subtheme
    expect(true).toBeFalsy();
  });

  it('should prevent you from selecting knacks, builds and spells unless you have choosen the subtheme', () => {
    // If you haven't chosen a subtheme then disable all buttons within the magic-component
    expect(true).toBeFalsy();
  });

});
