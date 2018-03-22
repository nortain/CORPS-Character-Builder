import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {MagicDefense} from "../magic-defense/magic-defense";
import {STARTING_MAGIC_DEFENSES} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeType} from "../attribute/attribute-type.enum";

export class Character extends Race {

  themePoints: ThemePointsContainer;
  weapons: Array<Weapon>;
  armor: Armor;
  magicDefenses: Array<MagicDefense>;

  constructor(public name: string, public raceType: RaceType, level?: Level, subRace?: RacialSubType, themePoints = new ThemePointsContainer()) {
    super(raceType, level, subRace);
    this.magicDefenses = STARTING_MAGIC_DEFENSES;

  }

  getInitiative(): number {
    return 4;
  }

  getMovement(): number {
    return 6;
  }

  /**
   * Need to add more notes about how attributes are assigned to characters.
   * @param {number} points
   * @param {AttributeType} attribute
   */
  assignAttributePoint(points: number, attribute: AttributeType) {

  }


}
