import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellChartComponent } from './spell-chart.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {DiceService} from "../../../../../shared/character/dice/dice.service";
import {mockSpell} from "../../../../../shared/constants/testing-constants";

fdescribe('SpellChartComponent', () => {
  let component: SpellChartComponent;
  let fixture: ComponentFixture<SpellChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [ SpellChartComponent ],
      providers: [DiceService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellChartComponent);
    component = fixture.componentInstance;
    component.spell = mockSpell();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
