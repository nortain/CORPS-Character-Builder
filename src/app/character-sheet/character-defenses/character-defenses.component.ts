import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../shared/character/character";
import {Defense} from "../../shared/character/defenses/defense";

@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css']
})
export class CharacterDefensesComponent implements OnInit {
  @Input() defense: Defense;

  constructor() {
  }

  ngOnInit() {
  }

}
