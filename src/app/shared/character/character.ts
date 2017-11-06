import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {MagicDefense} from "../magic-defense/magic-defense";
import {STARTING_MAGIC_DEFENSES} from "../constants";
import {RaceType} from "./race/race-type.enum";

export class Character extends Race {

  weapons: Array<Weapon>;
  armor: Armor;
  magicDefenses: Array<MagicDefense>;

  constructor(public name: string, public raceType: RaceType) {
    super(raceType);
    this.magicDefenses = STARTING_MAGIC_DEFENSES;

  }
}
