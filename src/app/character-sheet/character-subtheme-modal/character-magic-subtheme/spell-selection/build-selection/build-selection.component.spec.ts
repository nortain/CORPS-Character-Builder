import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BuildSelectionComponent} from './build-selection.component';
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {SharedModule} from "../../../../../shared/shared.module";
import {SpellChartComponent} from "../spell-chart/spell-chart.component";
import {mockSpecialPower, mockSpell, mockSubtheme} from "../../../../../shared/constants/testing-constants";
import {CasterType, SubthemeType} from "../../../../../shared/theme-points/subthemes/subtheme-type.enum";
import {ThemeStrength} from "../../../../../shared/theme-points/theme-strength.enum";
import {By} from "@angular/platform-browser";

describe('BuildSelectionComponent', () => {
  let component: BuildSelectionComponent;
  let fixture: ComponentFixture<BuildSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NgbModule.forRoot()],
      providers: [NgbModal, NgbModalStack],
      declarations: [BuildSelectionComponent, SpellChartComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSelectionComponent);
    component = fixture.componentInstance;
    component.subtheme = mockSubtheme(SubthemeType.Magent, ThemeStrength.Minor);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to select a build', () => {
    component.selectedBuild = null;
    const build = mockSpecialPower();
    component.selectBuild(build);
    expect(component.selectedBuild).toEqual(build);
    component.selectBuild(build);
    expect(component.selectedBuild).toBeNull();
  });

  it('should send all selections to parent each time a new selection or deselection is made', () => {
    const power = mockSpecialPower();
    spyOn(component.submitter, "emit");
    component.selectBuild(power);
    expect(component.submitter.emit).toHaveBeenCalledWith({
      ...component.selectedBuild
    });
    component.selectBuild(power);
    expect(component.selectedBuild).toBeNull();
    expect(component.submitter.emit).toHaveBeenCalledWith({
      ...power
    });
    expect(component.submitter.emit).toHaveBeenCalledTimes(2);
  });

  it('should be able to load previously selected spells', () => {
    const previousPower = mockSpecialPower();
    component.previouslySelectedBuild = previousPower;
    component.buildsToChooseFrom = [previousPower];
    component.ngOnInit();
    expect(component.selectedBuild).toBe(previousPower);
  });

  it('should show a build as being selected once it is selected', () => {
    const previousPower = mockSpecialPower();
    component.buildsToChooseFrom = [previousPower];
    fixture.detectChanges();
    let selected = fixture.debugElement.queryAll(By.css(".selectedBuildDisplay"));
    expect(selected.length).toEqual(0);
    const btns = fixture.debugElement.queryAll(By.css(".buildButton"));
    btns[0].nativeElement.click();
    fixture.detectChanges();
    selected = fixture.debugElement.queryAll(By.css(".selectedBuildDisplay"));
    expect(selected.length).toEqual(1);
    expect(selected[0].nativeElement.innerText).toContain(component.selectedBuild.name);

  });

  it('should be able to determine if all builds are expanded or not', () => {
    const previousPower = mockSpecialPower();
    component.buildsToChooseFrom = [previousPower];
    fixture.detectChanges();
    expect(component.shouldBuildsBeExpanded()).toBeTruthy();
    const buildHeader = fixture.debugElement.queryAll(By.css(".buildHeader"));
    for (const build of buildHeader) { // open all of the headers
      build.nativeElement.click();
    }
    fixture.detectChanges();
    expect(component.shouldBuildsBeExpanded()).toBeFalsy();
  });

  it('should be able to expand/collapse all builds', () => {
    const previousPower = mockSpecialPower();
    previousPower.powers[0].sphereName = CasterType.Magent;
    previousPower.powers[1].sphereName = CasterType.Magent;
    component.buildsToChooseFrom = [previousPower];
    fixture.detectChanges();
    expect(component.shouldBuildsBeExpanded()).toBeTruthy();
    let expandAllBtn = fixture.debugElement.query(By.css("#openAllBuilds"));
    expect(expandAllBtn.nativeElement.innerText).toBe("Expand All Builds");
    expandAllBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.shouldBuildsBeExpanded()).toBeFalsy();
    expandAllBtn = fixture.debugElement.query(By.css("#openAllBuilds"));
    expect(expandAllBtn.nativeElement.innerText).toBe("Collapse All Builds");
    expandAllBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.shouldBuildsBeExpanded()).toBeTruthy();
  });
});
