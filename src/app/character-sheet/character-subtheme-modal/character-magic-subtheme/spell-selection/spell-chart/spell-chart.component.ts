import {Component, Input, OnInit} from '@angular/core';
import {Dice} from "../../../../../shared/character/dice/dice";
import {DiceService} from "../../../../../shared/character/dice/dice.service";
import {Spell} from "../../../../../shared/spells/spell";
import {SpellKeyword} from "../../../../../shared/spells/enums/spell-keywords.enum";
import {SpellChart} from "../../../../../shared/spells/spell-chart";
import {SpellDamageKeyword} from "../../../../../shared/spells/enums/spell-damage-keyword.enum";


@Component({
  selector: 'corps-spell-chart',
  templateUrl: './spell-chart.component.html',
  styleUrls: ['./spell-chart.component.css']
})
export class SpellChartComponent implements OnInit {
  minion: SpellKeyword | SpellDamageKeyword = SpellKeyword.Minion;

  @Input() spell: Spell;

  constructor(private diceService: DiceService) {
  }

  ngOnInit() {
  }


  getSpellRoll(spellChart: SpellChart[]): Dice[] {
    const spellDice = [];
    for (const chart of spellChart) {
      spellDice.push(this.diceService.getArrayOfDice(chart.dieSize, chart.minValue, chart.maxValue, chart.levelRange, chart.damageKeyword, chart.modifier));
    }
    return spellDice;
  }

}
