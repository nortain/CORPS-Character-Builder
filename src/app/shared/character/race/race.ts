import {AttributeName} from "../../attribute/attribute-name.enum";
import {ThemeType} from "../../theme-points/theme-type.enum";
import {MagicDefenseType} from "../../magic-defense/magic-defense-type.enum";
import {FieldMap} from "../../field/field-map";
import {RaceType} from "./race-type.enum";
import {VisionType} from "./vision-type.enum";

export interface Race {
  type: RaceType;
  vision: VisionType;
  magicDefenseBonus: MagicDefenseType;
  availableAttributePoints: number;
  availableLanguagePoints: number;
  passiveBonuses: Array<string>;
  activeBonuses: Array<string>;
  talentBonus: Array<ThemeType>;
  startingAttributes: Array<AttributeName>;
  optionalStartingAttributes: Array<AttributeName>;
  powerPointsBonus: number;
  racialRestrictions: string;
  mechanicalBonusValues: FieldMap;

}
