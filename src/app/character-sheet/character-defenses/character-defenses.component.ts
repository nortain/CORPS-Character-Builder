import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../shared/character/character";
import {PhysicalDefense} from "../../shared/character/phsyical-defense/physical-defense";


@Component({
  selector: 'corps-character-defenses',
  templateUrl: './character-defenses.component.html',
  styleUrls: ['./character-defenses.component.css']
})
export class CharacterDefensesComponent implements OnInit {
  @Input() defense: PhysicalDefense;

  constructor() {
  }

  ngOnInit() {
  }

}
