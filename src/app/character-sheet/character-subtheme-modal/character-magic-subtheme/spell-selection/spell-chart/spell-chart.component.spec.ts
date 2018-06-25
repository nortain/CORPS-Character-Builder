import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellChartComponent } from './spell-chart.component';
import {SharedModule} from "../../../../../shared/shared.module";
import {DiceService} from "../../../../../shared/character/dice/dice.service";
import {mockSpell, mockSpellChart} from "../../../../../shared/constants/testing-constants";
import {LevelRange} from "../../../../../shared/spells/enums/level-range.enum";
import {SpellEffectType} from "../../../../../shared/spells/spell";
import {By} from "@angular/platform-browser";

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

  it('should only display 2 rows when display a spell with a level range of 10', () => {
    const mock = mockSpell();
    const mockChart = mockSpellChart();
    mockChart.levelRange = LevelRange.TEN;
    mock.spellEffectText = [{
      type: SpellEffectType.SpellEffect,
      text: "You fire lightning from your arse",
      spellChart: [mockChart]
    }];
    component.spell = mock;
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css(".SpellEffect0TableLevel"));
    expect(rows.length).toEqual(2);


  });

});
