import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpellSelectionComponent} from './spell-selection.component';
import {mockSpecialPower, mockSpell, mockSubtheme} from "../../../../shared/constants/testing-constants";
import {ThemeStrength} from "../../../../shared/theme-points/theme-strength.enum";
import {MagicType, SpellSelectionType} from "../magic-type.enum";
import {SharedModule} from "../../../../shared/shared.module";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {CasterType, SubthemeType} from "../../../../shared/theme-points/subthemes/subtheme-type.enum";
import {By} from "@angular/platform-browser";

import {Spell, SpellEffectType} from "../../../../shared/spells/spell";
import {DebugElement} from "@angular/core";
import {SpellChartComponent} from "./spell-chart/spell-chart.component";
import {SpellRequirement} from "../../../../shared/spells/enums/spell-requirement.enum";

describe('SpellSelectionComponent', () => {
  let component: SpellSelectionComponent;
  let fixture: ComponentFixture<SpellSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbModalStack],
      declarations: [SpellSelectionComponent, SpellChartComponent],
    })
      .compileComponents();
  }));

  /**
   * By default we assume we're using a mock subtheme with no general theme point, can select 1 build of type Spells and that the display toggle button has been clicked
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(SpellSelectionComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    component.generalThemePoint = ThemeStrength.None;
    component.numberOfSpellsToSelect = 1;
    component.propertyType = SpellSelectionType.Spells;
    component.selectionDisplayToggle = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to display and hide spells', () => {
    component.displaySpells();
    expect(component.selectionDisplayToggle).toBeFalsy();
  });

  it('should know if the subtheme is selected', () => {
    expect(component.isSubthemeSelected()).toBeTruthy();
  });

  it('should be able to open a spell adding or removing it from the open spell list', () => {
    const spell = mockSpell();
    component.openSpell(spell);
    expect(component.openSpells.length).toEqual(1);
    expect(component.openSpells[0]).toEqual(spell);
  });

  it('should be able to get the spell text from a spell', () => {
    spyOn(component, "getMagicText").and.returnValue(mockSpell());
    expect(component.getSpellData()[0]).toEqual(mockSpell());
  });

  it('should be able to get the spell text from an array of spells', () => {
    spyOn(component, "getMagicText").and.returnValue([mockSpell()]);
    expect(component.getSpellData()[0]).toEqual(mockSpell());
  });


  it('should be able to get the spell text from a special power', () => {
    component.numberOfSpellsToSelect = 1;
    component.propertyIndex = 0;
    component.propertyType = SpellSelectionType.SpecialPowers;
    spyOn(component, "getMagicText").and.returnValue([{name: "awesome", powers: [mockSpell()], requirement: SpellRequirement.Always}]);
    fixture.detectChanges();
    expect(component.getSpellData()[0]).toEqual(mockSpell());
  });

  it('should be able to display a spells name from a special power', () => {
    component.numberOfSpellsToSelect = 1;
    component.propertyIndex = 0;
    component.propertyType = SpellSelectionType.SpecialPowers;
    spyOn(component, "getMagicText").and.returnValue([{name: "awesome", powers: [mockSpell()], requirement: SpellRequirement.Always}]);
    fixture.detectChanges();
    const name = fixture.debugElement.query(By.css(".name"));
    expect(name.nativeElement.innerText.trim()).toBe(mockSpell().name + " (Direct Attack)");
  });

  it('should be able to display a spells keywords', () => {
    spyOn(component, "getMagicText").and.returnValue([mockSpell()]);
    component.openSpell(mockSpell());
    fixture.detectChanges();
    const keywords = fixture.debugElement.query(By.css("#keywordsHolder"));
    expect(keywords.nativeElement.innerText).toBe("Keywords: " + mockSpell().damageKeyword + ", " + mockSpell().spellKeywords[0]);
  });


  describe('while openning the spell and mocking out the data coming back', function () {


    /*Same setup as above only now we open the build and mock out the data coming back*/
    beforeEach(() => {
      fixture = TestBed.createComponent(SpellSelectionComponent);
      component = fixture.componentInstance;
      component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
      component.generalThemePoint = ThemeStrength.None;
      component.numberOfSpellsToSelect = 1;
      component.propertyType = SpellSelectionType.Spells;
      component.selectionDisplayToggle = true;
      spyOn(component, "getMagicText").and.returnValue([mockSpell()]);
      component.openSpell(mockSpell());
      fixture.detectChanges();
    });

    it('should be able to show defense type', () => {
      const defenseType = fixture.debugElement.query(By.css("#defenseTypeHolder"));
      expect(defenseType.nativeElement.innerText).toBe("Defense Type: " + mockSpell().defenseType[0] + "/" + mockSpell().defenseType[1]);
    });

    it('should be able to show area of effect', () => {
      const result = "Zone 2 in 10";
      const aoe = fixture.debugElement.query(By.css("#aoe"));
      expect(aoe.nativeElement.innerText).toBe(result);
    });

    it('should be able to show cast action', () => {
      const castAction = fixture.debugElement.query(By.css("#castAction"));
      expect(castAction.nativeElement.innerText).toBe("Standard");
    });

    it('should be able to display duration', () => {
      const duration = fixture.debugElement.query(By.css("#durationHolder"));
      expect(duration.nativeElement.innerText).toBe("Duration: Immediate/Encounter");
    });

    it('should be able to display crit die as a roll', () => {
      const critDie = fixture.debugElement.query(By.css("#critDie"));
      expect(critDie.nativeElement.innerText).toBe("1d6+1");
    });

    it('should be able to display spell effect texts', () => {
      const labelResults = ["Spell Effect", "On Hit", "Bounce", "On Miss"];
      const textResults = [mockSpell().spellEffectText[0].text, mockSpell().spellEffectText[1].text, mockSpell().spellEffectText[2].text, mockSpell().spellEffectText[3].text];
      for (let i = 0; i < 4; i++) {
        const selector = ".spellEffect" + i;
        const labelSelector = ".label" + i;
        const label = fixture.debugElement.query(By.css(labelSelector));
        const spellText = fixture.debugElement.query(By.css(selector));
        expect(label.nativeElement.innerText).toBe(labelResults[i] + ":");
        expect(spellText.nativeElement.innerText).toBe(textResults[i]);
      }

    });

    it('should be able to display a hit chart for the default spell effect', () => {
      const labelResults = ["SpellEffect", "OnHit", "Bounce", "OnMiss"];
      const ans1 = ["1d8+8", "1d8+9", "2d8+7", "2d8+9", "2d8+10"];
      const ans2 = ["2d8+12", "2d8+14", "2d8+16", "3d8+13", "3d8+15"];
      const ans3 = ["3d8+17", "3d8+19", "3d8+21", "4d8+18", "4d8+20"];
      for (let i = 0; i < 4; i++) {
        const tableSelector = "#" + labelResults[i].trim() + i + "Table";
        const rowSelector1 = "." + labelResults[i].trim() + "TableChart1";
        const rowSelector2 = "." + labelResults[i].trim() + "TableChart2";
        const rowSelector3 = "." + labelResults[i].trim() + "TableChart3";
        const table = fixture.debugElement.queryAll(By.css(tableSelector));
        expect(table.length).toEqual(1);
        const row1 = table[0].queryAll(By.css(rowSelector1));
        const row2 = table[0].queryAll(By.css(rowSelector2));
        const row3 = table[0].queryAll(By.css(rowSelector3));
        row1.forEach((item: DebugElement, index: number) => {
          expect(item.nativeElement.innerText.trim()).toBe(ans1[index]);
        });
        row2.forEach((item: DebugElement, index: number) => {
          expect(item.nativeElement.innerText.trim()).toBe(ans2[index]);
        });
        row3.forEach((item: DebugElement, index: number) => {
          expect(item.nativeElement.innerText.trim()).toBe(ans3[index]);
        });
      }
    });

    it('should send all selections to parent each time a new selection or deselection is made', () => {
      const spell = mockSpell();
      spyOn(component.submitter, "emit");
      component.selectSpell(spell);
      expect(component.submitter.emit).toHaveBeenCalledWith({
        subtheme: component.subtheme,
        spells: component.selectedSpells
      });
    });

    it('should be able to load previously selected spells', () => {
      const fakoSpell = mockSpell();
      fakoSpell.sphereName = CasterType.Magent;
      const previousSpells = [fakoSpell];
      component.previouslySelectedSpell = previousSpells;
      component.ngOnInit();
      expect(component.selectedSpells).toBe(previousSpells);
    });

    it('should deselect a spell if you try to select a spell that has already been selected', () => {
      const fakoSpell = mockSpell();
      component.numberOfSpellsToSelect = 5;
      fakoSpell.sphereName = CasterType.Magent;
      component.selectSpell(fakoSpell);
      expect(component.selectedSpells).toEqual([fakoSpell]);
      component.selectSpell(fakoSpell);
      expect(component.selectedSpells).toEqual([]);
    });
  });

  it('should be able to determine if all builds are expanded or not', () => {
    const previousPower = mockSpell();
    spyOn(component, "getSpellData").and.returnValue([previousPower]);
    fixture.detectChanges();
    expect(component.shouldSpellsBeExpanded()).toBeTruthy();
    const buildHeader = fixture.debugElement.queryAll(By.css(".spellHeader"));
    for (const build of buildHeader) { // open all of the headers
      build.nativeElement.click();
    }
    fixture.detectChanges();
    expect(component.shouldSpellsBeExpanded()).toBeFalsy();
  });

  it('should be able to expand/collapse all builds', () => {
    const previousPower = mockSpell();
    spyOn(component, "getSpellData").and.returnValue([previousPower]);
    fixture.detectChanges();
    expect(component.shouldSpellsBeExpanded()).toBeTruthy();
    let expandAllBtn = fixture.debugElement.query(By.css("#openAllSpells"));
    expect(expandAllBtn.nativeElement.innerText).toBe("Expand All Spells");
    expandAllBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.shouldSpellsBeExpanded()).toBeFalsy();
    expandAllBtn = fixture.debugElement.query(By.css("#openAllSpells"));
    expect(expandAllBtn.nativeElement.innerText).toBe("Collapse All Spells");
    expandAllBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.shouldSpellsBeExpanded()).toBeTruthy();
  });


  describe('testing that fields are hidden when empty', function () {

    beforeEach(() => {
      fixture = TestBed.createComponent(SpellSelectionComponent);
      component = fixture.componentInstance;
      component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
      component.generalThemePoint = ThemeStrength.None;
      component.numberOfSpellsToSelect = 1;
      component.propertyType = SpellSelectionType.Spells;
      component.selectionDisplayToggle = true;
      spyOn(component, "getMagicText").and.returnValue([
        {
          name: "fireball",
        }
      ]);
      component.openSpell({
        name: "fireball"
      } as Spell);
      fixture.detectChanges();
    });

    it('shouldnt display fields if they arent present', () => {
      const keywords = fixture.debugElement.queryAll(By.css("#keywordsHolder"));
      const defenseType = fixture.debugElement.queryAll(By.css("#defenseTypeHolder"));
      const aoe = fixture.debugElement.queryAll(By.css("#aoeHolder"));
      const castAction = fixture.debugElement.queryAll(By.css("#castActionHolder"));
      const duration = fixture.debugElement.queryAll(By.css("#durationHolder"));
      const critDie = fixture.debugElement.queryAll(By.css("#critDie"));

      expect(keywords.length).toEqual(0, "keywords should be hidden");
      expect(defenseType.length).toEqual(0, "defense type should be hidden");
      expect(aoe.length).toEqual(0, "aoe should be hidden");
      expect(castAction.length).toEqual(0, "cast action should be hidden");
      expect(duration.length).toEqual(0, "duration should be hidden");
      expect(critDie.length).toEqual(0, "crit die should be hidden");
    });
  });

});
