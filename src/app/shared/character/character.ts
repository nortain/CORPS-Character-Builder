import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {MagicDefense} from "../magic-defense/magic-defense";
import {StartingCharacterAttributes, StartingCharacterMagicDefense, STARTING_MOVEMENT} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeType} from "../attribute/attribute-type.enum";
import {AttributeName} from "../attribute/attribute-name.enum";

export class Character extends Race {

  themePoints: ThemePointsContainer;
  weapons: Array<Weapon>;
  armor: Armor;
  magicDefenses: StartingCharacterMagicDefense;
  attributes: StartingCharacterAttributes;

  constructor(public name: string, public raceType: RaceType, level?: Level, subRace?: RacialSubType, themePoints = new ThemePointsContainer()) {
    super(raceType, level, subRace);
    this.magicDefenses = new StartingCharacterMagicDefense();
    this.attributes = new StartingCharacterAttributes();

  }

  getInitiative(): number {
    return 4;
  }

  getSpeed(): number {
    return STARTING_MOVEMENT + this.attributes[AttributeName.Agility].getSpeedBonus();
  }

  /**
   * Need to add more notes about how attributes are assigned to characters.
   * @param {number} points
   * @param {AttributeType} attribute
   */
  assignAttributePoint(points: number, attribute: AttributeType) {

  }


}
