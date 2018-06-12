import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpellSelectionComponent} from './spell-selection.component';
import {mockSpell, mockSubtheme} from "../../../../shared/constants/testing-constants";
import {ThemeStrength} from "../../../../shared/theme-points/theme-strength.enum";
import {MagicType, SpellSelectionType} from "../magic-type.enum";
import {SharedModule} from "../../../../shared/shared.module";
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {SubthemeType} from "../../../../shared/theme-points/subthemes/subtheme-types.enum";
import {By} from "@angular/platform-browser";

fdescribe('SpellSelectionComponent', () => {
  let component: SpellSelectionComponent;
  let fixture: ComponentFixture<SpellSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbModalStack],
      declarations: [SpellSelectionComponent],
    })
      .compileComponents();
  }));

  /**
   * By default we assume we're using a mock subtheme with no general theme point, can select 1 spell of type Spells and that the display toggle button has been clicked
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
    spyOn(component, "getMagicText").and.returnValue({name: "awesome", powers: [mockSpell()]});
    expect(component.getSpellData()[0]).toEqual(mockSpell());
  });

  it('should be able to display a spells name', () => {
    spyOn(component, "getMagicText").and.returnValue({name: "awesome", powers: [mockSpell()]});
    fixture.detectChanges();
    const name = fixture.debugElement.query(By.css(".name"));
    expect(name.nativeElement.innerText.trim()).toBe(mockSpell().name + " (Direct Attack)");
  });

  it('should be able to display a spells keywords', () => {
    spyOn(component, "getMagicText").and.returnValue([mockSpell()]);
    component.openSpell(mockSpell());
    fixture.detectChanges();
    const keywords = fixture.debugElement.query(By.css("#keywords"));
    expect(keywords.nativeElement.innerText).toBe(mockSpell().damageKeyword);
  });


  describe('', function () {


    /*Same setup as above only now we open the spell and mock out the data coming back*/
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
      const defenseType = fixture.debugElement.query(By.css("#defenseType"));
      expect(defenseType.nativeElement.innerText).toBe(mockSpell().defenseType[0]);
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
  });

});
