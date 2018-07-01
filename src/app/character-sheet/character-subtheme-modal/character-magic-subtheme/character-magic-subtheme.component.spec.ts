import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {CharacterMagicSubthemeComponent} from './character-magic-subtheme.component';
import {mockKnack, mockPreviouslySelectedBuild, mockSpecialPower, mockSubtheme} from "../../../shared/constants/testing-constants";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-type.enum";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {MagicType, NumberToSelect} from "./magic-type.enum";
import {ONE_MAGIC_SPELLS} from "../../../shared/constants/constants";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../../../shared/shared.module";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {SpellSelectionComponent} from "./spell-selection/spell-selection.component";
import {SpellChartComponent} from "./spell-selection/spell-chart/spell-chart.component";
import {Level} from "../../../shared/character/level.enum";
import {BuildSelectionComponent} from "./spell-selection/build-selection/build-selection.component";

describe('CharacterMagicSubthemeComponent', () => {
  let component: CharacterMagicSubthemeComponent;
  let fixture: ComponentFixture<CharacterMagicSubthemeComponent>;
  let modalService;


  function unselectedSubthemeSetup() {
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.None);
    component.knackDisplayToggle = true;
    fixture.detectChanges();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbModalStack],
      declarations: [CharacterMagicSubthemeComponent, SpellSelectionComponent, SpellChartComponent, BuildSelectionComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.characterLevel = Level.One;
    component.knackDisplayToggle = true;
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
  });

  beforeEach(inject([NgbModal], (svc: NgbModal) => {
    modalService = svc;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get magic text', () => {
    const result = component.getMagicText(MagicType.FeatureBonus);
    expect(result).toBe(ONE_MAGIC_SPELLS["Magent"].FeatureBonus);
  });

  it('should be able to actually selected a magic subtheme', () => {
    unselectedSubthemeSetup();
    const mock = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.subthemePointCap = 1;
    spyOn(component.submitter, "emit");
    let selectSubtheme = fixture.debugElement.queryAll(By.css(".subthemeSelectBtn"));
    expect(selectSubtheme.length).toEqual(1);
    expect(selectSubtheme[0].nativeElement.innerText).toBe("Select Subtheme");
    selectSubtheme[0].nativeElement.click();
    fixture.detectChanges();
    selectSubtheme = fixture.debugElement.queryAll(By.css(".subthemeSelectBtn"));
    expect(selectSubtheme[0].nativeElement.innerText).toBe("Deselect Subtheme");
    expect(component.submitter.emit).toHaveBeenCalledWith(
      {
        subtheme: mock,
        knacks: component.selectedKnacks
      });

  });

  it('should reset any selected knacks/spells and builds when deselected a magical subtheme', fakeAsync(() => {
    spyOn(modalService, "open").and.returnValue({
      componentInstance: {
        bodyText: "awesome"
      },
      result: Promise.resolve(true)

    });
    component.selectedKnacks.push(mockKnack());
    component.selectSubtheme(); // deselects the current subtheme
    tick();
    expect(component.selectedKnacks.length).toEqual(0);
  }));

   it('should give the user a warning message when deselecting a subtheme that their selections will be lost', fakeAsync(() => {
    spyOn(component, "resetSubtheme");
    spyOn(modalService, "open").and.returnValue({
      componentInstance: {
        bodyText: "awesome"
      },
      result: Promise.resolve(true)
    });
    component.numberOfKnacksToSelect = 1;
    const knackBtn = fixture.debugElement.query(By.css(".knackButton")).nativeElement;
    knackBtn.click();
    fixture.detectChanges();
    const selectSubtheme = fixture.debugElement.query(By.css(".subthemeSelectBtn")).nativeElement;
    selectSubtheme.click();
    fixture.detectChanges();
    expect(modalService.open).toHaveBeenCalled();
    tick();
    expect(component.resetSubtheme).toHaveBeenCalled();
  }));

  it('should have knack not displayed if knacks can not be selected', () => {
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    let knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks.length).toEqual(0);
    component.generalThemePoint = ThemeStrength.Minor;
    component.ngOnChanges();
    fixture.detectChanges();
    knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks[0].nativeElement.classList.contains("disabled")).toBeFalsy();
  });

  it('should have knacks disabled if the subtheme is not yet selected', () => {
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.None);
    fixture.detectChanges();
    let knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks[0].nativeElement.classList.contains("disabled")).toBeTruthy();
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.ngOnChanges();
    fixture.detectChanges();
    knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks[0].nativeElement.classList.contains("disabled")).toBeFalsy();
  });

  it('should only give a popup confirmation if some change has been made to a knack after selecting the knack', () => {
    const selectSubtheme = fixture.debugElement.query(By.css(".subthemeSelectBtn")).nativeElement;
    selectSubtheme.click();
    fixture.detectChanges();
    expect(component.subtheme.themeStrength).toEqual(ThemeStrength.None);
  });

  it('should be able to load previously selected knacks', () => {
    const mock = {
      ...mockKnack(),
      subthemeName: "Magent"
    };
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.previouslySelectedBuild = [mock];
    component.knackDisplayToggle = true;
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    expect(component.selectedKnacks.length).toEqual(1);
  });

  it('should hide selected knack/spells/build when viewing a different spell sphere/ magic subtheme', () => {
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.previouslySelectedBuild = [mockKnack()];
    component.knackDisplayToggle = true;
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    expect(component.selectedKnacks.length).toEqual(0);
  });

  it('should not be able to select a subtheme if the subthemePointCap and the subtheme strength are both 0', () => {
    component.subtheme = new Subtheme(SubthemeType.Magent, ThemeStrength.None);
    expect(component.subtheme.themeStrength).toEqual(0);
    component.subthemePointCap = 0;
    fixture.detectChanges();
    spyOn(component, "selectSubtheme");
    const themeBtn = fixture.debugElement.query(By.css(".subthemeSelectBtn"));
    themeBtn.nativeElement.click();
    fixture.detectChanges();
    expect(themeBtn.nativeElement.innerText).toBe("Select Subtheme");
    expect(component.selectSubtheme).not.toHaveBeenCalled();
  });

  it('should only display feature bonus if they are 0g', () => {
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    const feature = fixture.debugElement.queryAll(By.css("#featureRow"));
    const general = fixture.debugElement.queryAll(By.css("#generalRow"));
    expect(feature.length).toEqual(1);
    expect(general.length).toEqual(0);
  });

  it('general bonus if they have 1 general', () => {
    component.generalThemePoint = ThemeStrength.Minor;
    fixture.detectChanges();
    const feature = fixture.debugElement.queryAll(By.css("#featureRow"));
    const general = fixture.debugElement.queryAll(By.css("#generalRow"));
    expect(feature.length).toEqual(0);
    expect(general.length).toEqual(1);
  });

  it('should be able to hide knacks if the character cannot select knacks', () => {
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    const knackButton = fixture.debugElement.queryAll(By.css("#displayKnackButton"));
    expect(knackButton.length).toEqual(0);
  });

  it('should be able to display knacks if they are a 1g', () => {
    component.generalThemePoint = ThemeStrength.Minor;
    fixture.detectChanges();
    const knackButton = fixture.debugElement.queryAll(By.css("#displayKnackButton"));
    expect(knackButton.length).toEqual(1);
  });

  it('should be able to display knacks if they are a 3m', () => {
    component.subtheme = mockSubtheme(SubthemeType.Shaman, ThemeStrength.None);
    component.subthemePointCap = 3;
    fixture.detectChanges();
    const knackButton = fixture.debugElement.queryAll(By.css("#displayKnackButton"));
    expect(knackButton.length).toEqual(1);
  });

  it('should be able to select a character build within the magic subtheme', () => {
    expect(true).toBeFalsy();
  });

  it('should be able to increment the number of spells they can pick if they are a 2m', () => {
    component.characterLevel = Level.One;
    component.subtheme = mockSubtheme(SubthemeType.Cleric, ThemeStrength.None);
    component.subthemePointCap = 2;
    component.generalThemePoint = ThemeStrength.None;
    fixture.detectChanges();
    expect(component.getNumberOfSpells()).toEqual(4);
    component.generalThemePoint = ThemeStrength.Minor;
    fixture.detectChanges();
    expect(component.getNumberOfSpells()).toEqual(5);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMagicSubthemeComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor); // this means subtheme is selected
    component.characterLevel = Level.One;
    component.knackDisplayToggle = true;
    component.generalThemePoint = ThemeStrength.Minor;
    fixture.detectChanges();
  });

  it('should prevent you from selecting knacks, builds and spells unless you have chosen the subtheme', () => {
    unselectedSubthemeSetup();
    component.subthemePointCap = 1;
    let knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks[0].nativeElement.classList.contains("disabled")).toBeTruthy();
    const selectSubtheme = fixture.debugElement.query(By.css(".subthemeSelectBtn")).nativeElement;
    selectSubtheme.click();
    component.numberOfKnacksToSelect = 1;
    fixture.detectChanges();
    knacks = fixture.debugElement.queryAll(By.css(".knackButton"));
    expect(knacks[0].nativeElement.classList.contains("disabled")).toBeFalsy();
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
    component.generalThemePoint = ThemeStrength.None;
    component.ngOnChanges();
    expect(component.numberOfKnacksToSelect).toEqual(0);
    component.generalThemePoint = ThemeStrength.Minor;
    component.ngOnChanges();
    expect(component.numberOfKnacksToSelect).toEqual(1);
    component.subtheme = mockSubtheme(SubthemeType.Shaman, ThemeStrength.Greater);
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

  it('should be able to determine if a sphere has a special power', () => {
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    fixture.detectChanges();
    expect(component.isSphereSpecial()).toBeFalsy();
    component.subtheme = mockSubtheme(SubthemeType.WarriorMage, ThemeStrength.Lesser);
    fixture.detectChanges();
    expect(component.isSphereSpecial()).toBeTruthy();

  });

  it('should be able to load previously selected spells', () => {
    const mock = mockPreviouslySelectedBuild();
    component.previouslySelectedBuild = mock;
    component.ngOnInit();
    expect(component.isSubthemeSelected()).toBeTruthy();
    expect(component.selectedKnacks).toBe(mock.knacks);
    // expect(component)


  });

  it('should be able to saving selected spells', () => {

  });

  it('should be able to load previously selected builds', () => {

  });

  it('should be able to save selected builds', () => {

  });

});
