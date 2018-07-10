import {async, ComponentFixture, fakeAsync, inject, TestBed, tick} from '@angular/core/testing';

import {CharacterSubthemeModalComponent} from './character-subtheme-modal.component';
import {SharedModule} from "../../../shared/shared.module";
import {SubthemeComponent} from "../subthemes/subtheme.component";
import {NgbActiveModal, NgbDropdownConfig, NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {actionClickDropdownItemX, actionGetDropdownValue, mockBuild, mockSubtheme, mockThemePoints} from "../../../shared/constants/testing-constants";
import {ThemeStrength} from "../../../shared/theme-points/theme-strength.enum";
import {ThemePointsContainer} from "../../../shared/theme-points/theme-points-container";
import {SubthemeContainer} from "../../../shared/theme-points/subthemes/subtheme-container";
import {SubthemeType} from "../../../shared/theme-points/subthemes/subtheme-type.enum";
import {Subtheme} from "../../../shared/theme-points/subthemes/subtheme";
import {By} from "@angular/platform-browser";
import {DropdownComponent} from "../../../shared/ui/dropdown/dropdown.component";
import {NgbDropdownMenu} from "@ng-bootstrap/ng-bootstrap/dropdown/dropdown";
import {CharacterMagicSubthemeComponent} from "../character-magic-subtheme/character-magic-subtheme.component";
import {nextTick} from "q";
import {SpellSelectionComponent} from "../character-magic-subtheme/spell-selection/spell-selection.component";
import {SpellChartComponent} from "../character-magic-subtheme/spell-selection/spell-chart/spell-chart.component";
import {BuildSelectionComponent} from "../character-magic-subtheme/spell-selection/build-selection/build-selection.component";

describe('CharacterSubthemeModalComponent', () => {
  let component: CharacterSubthemeModalComponent;
  let fixture: ComponentFixture<CharacterSubthemeModalComponent>;
  let weapon, protector, juggernaut, find, riposte, evasion, magent, activeModal;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      declarations: [SubthemeComponent, CharacterSubthemeModalComponent, CharacterMagicSubthemeComponent, SpellSelectionComponent, SpellChartComponent, BuildSelectionComponent],
      providers: [NgbDropdownConfig, NgbModal, NgbActiveModal, NgbModalStack]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSubthemeModalComponent);
    component = fixture.componentInstance;
    component.subthemePoints = new SubthemeContainer(mockThemePoints());
    component.getAllPossibleSubthemes();
    weapon = new Subtheme(SubthemeType.WeaponSpecialization, 0);
    protector = new Subtheme(SubthemeType.Protector, 0);
    juggernaut = new Subtheme(SubthemeType.Juggernaut, 0);
    find = new Subtheme(SubthemeType.FindWeakness, 0);
    riposte = new Subtheme(SubthemeType.Riposte, 0);
    evasion = new Subtheme(SubthemeType.Evasion, 0);
    magent = new Subtheme(SubthemeType.Magent, 0);
    fixture.detectChanges();
  });

  beforeEach(inject([NgbActiveModal], (svc: NgbActiveModal) => {
    activeModal = svc;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to get all possible subthemes when combat is the only possible subthemes available', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(ThemeStrength.Minor, 0, 0, 0));

    fixture.detectChanges();
    component.getAllPossibleSubthemes();
    expect(component.subthemeButtonsArray).toEqual([
      weapon, protector, juggernaut
    ]);
  });

  it('should be able to get all possible subthemes when stealth is the only possible subthemes available', () => {
    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(0, 1, 0, 1));
    component.getAllPossibleSubthemes();
    expect(component.subthemeButtonsArray).toEqual([
      find, riposte, evasion
    ]);
  });

  it('should be able to load in subthemes that have already been assigned values', () => {
    const sc = new SubthemeContainer(new ThemePointsContainer(3, 0, 0, 1));
    sc.assignSubtheme(new Subtheme(SubthemeType.Protector, ThemeStrength.Lesser));
    component.subthemePoints = sc;
    component.getAllPossibleSubthemes();

    let btn = fixture.debugElement.queryAll(By.css("#Protector"));
    btn[0].nativeElement.click();
    fixture.detectChanges();
    btn = fixture.debugElement.queryAll(By.css("#Protector"));
    expect(btn[0].nativeElement).toBeTruthy();
    expect(btn[0].nativeElement.innerText).toContain("Ranks: 2");
  });

  it('should load up the subtheme that is first in the array of subthemes', () => {
    const subComponent = fixture.debugElement.query(By.directive(SubthemeComponent));
    expect(subComponent.nativeElement).toBeTruthy();
    const name = subComponent.queryAll(By.css("label"));
    expect(name[0].nativeElement.innerText).toBe("Subtheme Name: Weapon Specialization");
  });

  it('should be able to switch subthemes displayed in subtheme component', () => {
    const buttons = fixture.debugElement.queryAll(By.css("button.verticalSubthemeBtns"));
    expect(buttons.length).toEqual(8);
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(component.viewedSubtheme).toBe(component.subthemeButtonsArray[1]);

  });

  it('should reset the theme strength dropdown to the value of that particular subtheme', () => {
    const buttons = fixture.debugElement.queryAll(By.css("button.verticalSubthemeBtns"));
    const dropdownValue = actionGetDropdownValue(fixture, "#subthemeDropdown");
    expect(dropdownValue).toBe("0");

    actionClickDropdownItemX(fixture, "#subthemeDropdown", 1);

    expect(actionGetDropdownValue(fixture, "#subthemeDropdown")).toBe("1");
    buttons[1].nativeElement.click();
    fixture.detectChanges();
    expect(actionGetDropdownValue(fixture, "#subthemeDropdown")).toBe("0");
  });

  it('should prevent a character from assigning more subtheme points across all subthemes of a paritciular type than they have available', () => {
    const dropdown = fixture.debugElement.query(By.css("#subthemeDropdown"));
    const dropdownBtn = dropdown.query(By.css("button")).nativeElement;
    dropdownBtn.click();
    const menuItems = dropdown.query(By.directive(NgbDropdownMenu)).queryAll(By.css("button.dropdown-item"));
    expect(menuItems.length).toEqual(2);
  });

  it('should be able to selected subtheme type as a string', () => {
    const result = component.getSubthemePointCap();
    expect(result).toEqual(1);
  });

  it('should show all subtheme points that are available within the subtheme-container dom', () => {
    const combat = fixture.debugElement.query(By.css("#combatTracker"));
    const stealth = fixture.debugElement.query(By.css("#stealthTracker"));
    const magic = fixture.debugElement.query(By.css("#magicTracker"));
    expect(combat.nativeElement.innerText).toContain(1);
    expect(stealth.nativeElement.innerText).toContain(1);
    expect(magic.nativeElement.innerText).toContain(1);
  });


  it('should be able to update subtheme container', () => {
    weapon.themeStrength = ThemeStrength.Minor;
    riposte.themeStrength = ThemeStrength.Minor;
    component.updateSubtheme(weapon);
    component.updateSubtheme(riposte);
    expect(component.subthemePoints.combat).toEqual(
      [weapon],
    );
    expect(component.subthemePoints.stealth).toEqual(
      [riposte]
    );
  });

  it('should be able to updateSubtheme after a magical subtheme has been selected', fakeAsync(() => {
    spyOn(component, "updateSubtheme");
    const mock = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);

    component.subthemePoints = new SubthemeContainer(new ThemePointsContainer(0, 0, 1, 1));
    component.getAllPossibleSubthemes();
    component.viewedSubtheme = magent;
    const btn = fixture.debugElement.queryAll(By.css("#Magent"));
    btn[0].nativeElement.click();
    tick();
    fixture.detectChanges();
    tick();
    const characterMagicComponent = fixture.debugElement.query(By.directive(CharacterMagicSubthemeComponent));
    expect(characterMagicComponent).toBeTruthy("could not find the character magic component on the freaking page");
    characterMagicComponent.componentInstance.submitter.emit(mock);
    fixture.detectChanges();
    expect(component.updateSubtheme).toHaveBeenCalled();

  }));

  it('should update a caster build', () => {
    const build = mockBuild();
    const sub = mockSubtheme();
    sub.casterBuild = build;
    component.viewSubtheme(sub);
    expect(component.viewedSubtheme.casterBuild).toBe(build);
  });

  it('should save all selected subthemes and their children when the submit button is pressed', () => {
    const result = new SubthemeContainer(new ThemePointsContainer(0, 0, 1, 0));
    spyOn(activeModal, "close");
    const build = mockBuild();
    const sub = mockSubtheme();
    component.subthemePoints = result;
    sub.casterBuild = build;
    component.close();
    result.magic = sub;
    expect(activeModal.close).toHaveBeenCalledWith(result);
  });

 it('should be able to load any selected magic subtheme that were previously selected', () => {
    // make the to load selected magic subtheme
    const result = new SubthemeContainer(new ThemePointsContainer(0, 0, 1, 0));
    spyOn(activeModal, "close");
    const build = mockBuild();
   const sub = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    sub.casterBuild = build;
    result.magic = sub;
    fixture = TestBed.createComponent(CharacterSubthemeModalComponent);
    component = fixture.componentInstance;
    component.subthemePoints = result;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.selectedMagicSubtheme).toBe(sub);

  });

  it('should be able to load any selected magic subtheme that were previously selected and it should be loaded in the UI if we are currently looking at it on startup', () => {
    // make the to load selected magic subtheme
    const result = new SubthemeContainer(new ThemePointsContainer(0, 0, 1, 0));
    spyOn(activeModal, "close");
    const build = mockBuild();
    const sub = mockSubtheme(SubthemeType.SpellWarden, ThemeStrength.Minor);
    sub.casterBuild = build;
    // assign the previously picked subtheme to the subtheme container and make a new testbed component
    result.magic = sub;
    fixture = TestBed.createComponent(CharacterSubthemeModalComponent);
    component = fixture.componentInstance;
    component.subthemePoints = result;
    try {
      fixture.detectChanges(); // first time around this calls ngOnInit
    } catch (err) { // catches any data errors in children components we don't care about
      expect(component.selectedMagicSubtheme).toBe(sub);
      const tracker = fixture.debugElement.query(By.css("#SpellWarden"));
      expect(tracker.nativeElement.innerText).toContain("(Magic) Ranks: 1");
    }
  });

});
