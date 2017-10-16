import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {MagicDefense} from "../magic-defense/magic-defense";
import {STARTING_MAGIC_DEFENSES} from "../constants";

export class Character {

  weapons: Array<Weapon>;
  armor: Armor;
  magicDefenses: Array<MagicDefense>;

  constructor(public name: string, public race: Race) {
    this.magicDefenses = STARTING_MAGIC_DEFENSES;
  }
}
