import {AttributeName} from "../../attribute/attribute-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {FieldMap} from "../../field/field-map";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";
import {Bonus} from "../bonus";
import {RacialSubType} from "./racial-sub-type.enum";

export interface Race {
  type: RaceType;
  vision: VisionType;
  racialSubType: RacialSubType;
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
  mechanicalBonusValues: any; // not sure how to type a string: array inteface

//  this string: array object will take in a mechanicBonus with a name matching an active or passive bonus with a key of the same name as the bonsu name.  The value will be a level based array of th resulting value

}
