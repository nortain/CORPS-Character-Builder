import {AttributeName} from "../../attribute/attribute-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {Bonus, BonusByLevel} from "../bonus";
import {RacialSubType} from "./racial-sub-type.enum";
import {Level} from "../level.enum";
import {STARTING_PLAYER_RACES} from "../../constants";

export class Race {
  vision: VisionType;
  magicDefenseBonus: MagicDefenseType;
  availableAttributePoints: number;
  availableLanguagePoints: number;
  passiveBonuses: Array<Bonus>;
  activeBonuses: Array<Bonus>;
  talentBonus: Array<ThemeType>;
  startingAttributes: Array<AttributeName>;
  optionalStartingAttributes: Array<AttributeName>;
  powerPointBonus: number;
  skillPointBonus: number;
  recoveryBonus: number;
  racialRestriction: string;
  mechanicalBonusValues: BonusByLevel;

  constructor(public raceType: RaceType, public level?: Level, public racialSubType?: RacialSubType) {
    if (!level) {
      this.level = Level.One;
    }
    this.initializeData(raceType, this.level, racialSubType);
  }


  initializeData(raceType: RaceType, level: Level, racialSubType?: RacialSubType) {
    this.vision = STARTING_PLAYER_RACES[raceType].vision ? STARTING_PLAYER_RACES[raceType].vision : VisionType.Normal;
    this.racialSubType = racialSubType;
    this.magicDefenseBonus = STARTING_PLAYER_RACES[raceType].magicDefenseBonus;
    this.availableAttributePoints = STARTING_PLAYER_RACES[raceType].availableAttributePoints ? STARTING_PLAYER_RACES[raceType].availableAttributePoints : 4;

    // TODO CONTINUE BUILDING THIS
  }

  formatText(text: String): string {
    let result = "";
    const chunk = text.split("$");
    if (chunk.length > 1) {
      for (let i = 1; i <= chunk.length; i += 2) {
        result.concat(chunk[i - 1]);
        result.concat(<string>this.getMechanicalBonus(chunk[i]));
      }
    } else {
      result = chunk[0];
    }
    return result;
  }

  getMechanicalBonus(propertyName: string): number | string {
    const valueArray = this.mechanicalBonusValues[propertyName];
    let valueResult: number | string;
    if (valueArray) {
      valueResult = valueArray[this.level];
    }
    return valueResult;
  }


//  this string: array object will take in a mechanicBonus with a name matching an active or passive bonus with a key of the same name as the bonsu name.  The value will be a level based array of th resulting value

}
