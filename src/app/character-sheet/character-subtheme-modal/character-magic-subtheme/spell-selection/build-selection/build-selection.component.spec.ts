import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSelectionComponent } from './build-selection.component';
import {NgbModal, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgbModalStack} from "@ng-bootstrap/ng-bootstrap/modal/modal-stack";
import {SharedModule} from "../../../../../shared/shared.module";
import {SpellChartComponent} from "../spell-chart/spell-chart.component";
import {mockSpecialPower} from "../../../../../shared/constants/testing-constants";

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

});
