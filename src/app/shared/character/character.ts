import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {StartingCharacterMagicDefense, STARTING_MOVEMENT, STARTING_INITIATIVE} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeType} from "../attribute/attribute-type.enum";
import {AttributeName} from "../attribute/attribute-name.enum";
import {StartingCharacterAttributes} from "../attribute/character-attribute/starting-character-attributes";

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
    let init = STARTING_INITIATIVE;
    init += this.attributes.Quickness.getInitiativeBonus();
    return init;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(): number {
    let result = STARTING_MOVEMENT;
    result = result +
      this.attributes[AttributeName.Agility].getSpeedBonus();
    if (this.armor) {
      result += this.armor.getMaxMovement().movementPenalty;
      if (result > this.armor.getMaxMovement().maxMovement) {
        result = this.armor.getMaxMovement().maxMovement;
      }
    }
    return result;
  }

  /**
   * Need to add more notes about how attributes are assigned to characters.
   * @param {number} points
   * @param {AttributeType} attribute
   */
  assignAttributePoint(points: number, attribute: AttributeType) {

  }


}
