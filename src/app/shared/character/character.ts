import {Race} from "./race/race";
import {Weapon} from "../weapon/weapon";
import {Armor} from "../armor/armor";
import {StartingCharacterMagicDefense, STARTING_MOVEMENT, STARTING_INITIATIVE, STEALTH_INIT_BONUS} from "../constants/constants";
import {RaceType} from "./race/race-type.enum";
import {Level} from "./level.enum";
import {RacialSubType} from "./race/racial-sub-type.enum";
import {ThemePointsContainer} from "../theme-points/theme-points-container";
import {AttributeType} from "../attribute/attribute-type.enum";
import {StartingCharacterAttributes} from "../attribute/character-attribute/starting-character-attributes";
import {AttributeBonus} from "../attribute/character-attribute/attribute-bonus.enum";
import {ArmorType} from "../armor/armor-type.enum";
import {WeaponClass} from "../weapon/weapon-class.enum";
import {WeaponCategory} from "../weapon/weapon-category.enum";

export class Character extends Race {

  constructor(public name: string,
              public raceType: RaceType,
              level?: Level,
              subRace?: RacialSubType,
              public themePoints = new ThemePointsContainer(),
              public armor = new Armor(ArmorType.None),
              public weapons = [new Weapon('Fist', WeaponClass.Unarmed, WeaponCategory.Balanced)],
              public magicDefenses = new StartingCharacterMagicDefense(),
              public attributes = new StartingCharacterAttributes()) {
    super(raceType, level, subRace);

  }

  getInitiative(): number {
    let init = STARTING_INITIATIVE;
    init += this.attributes.getBonus(AttributeBonus.InitiativeBonus);
    init += STEALTH_INIT_BONUS[this.themePoints.stealth.getStrength()];
    return init;
  }

  /**
   * gets the string based representation damage of a weapon given an index of the weapon in the array of weapons the character may have
   * @param {number} index of the weapon to fetch damage for
   * @returns {string} based representation of said weapon's damage
   */
  getWeaponDamage(index: number): string {
    let attributeBonus = 0;
    if (this.weapons[index].baseValues.category === WeaponCategory.Balanced) {
      attributeBonus = this.attributes.getBonus(AttributeBonus.SecondaryDamage);
    } else if (this.weapons[index].baseValues.category !== WeaponCategory.Simple) {
      attributeBonus = this.attributes.getBonus(AttributeBonus.PrimaryDamage);
    }
    this.weapons[0].baseValues.damage.modifierOfDice.addVal['attributes'] = attributeBonus;
    const result = this.weapons[0].baseValues.damage.printRoll();
    return result;
  }

  /**
   * Takes a normal characters default speed and should add in bonuses to speed from agility, armor and talents
   * @returns {number} the value that represents the speed of the character
   */
  getSpeed(): number {
    let result = STARTING_MOVEMENT;
    result = result + this.attributes.getBonus(AttributeBonus.SpeedBonus);
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
