import {Subtheme} from "../../theme-points/subthemes/subtheme";
import {SubthemeTypes} from "../../theme-points/subthemes/subtheme-types.enum";

export interface SubthemeObject {
  combat: Subtheme[];
  stealth: Subtheme[];
  magic: Subtheme[];
}

export function getSubthemeObject(magic: number): SubthemeObject {
  let magicArray;
  switch (magic) {
    case 1: {
      magicArray = [
        new Subtheme(SubthemeTypes.SpellWarden),
        new Subtheme(SubthemeTypes.Magent)
      ];
      break;
    }
    case 2: {
      magicArray = [
        new Subtheme(SubthemeTypes.Cleric),
        new Subtheme(SubthemeTypes.Assassin),
        new Subtheme(SubthemeTypes.Druid),
        new Subtheme(SubthemeTypes.WarriorMage)
      ];
      break;
    }
    case 3: {
      magicArray = [
        new Subtheme(SubthemeTypes.Necromancer),
        new Subtheme(SubthemeTypes.Mage),
        new Subtheme(SubthemeTypes.Elementalist),
        new Subtheme(SubthemeTypes.Priest),
        new Subtheme(SubthemeTypes.Shaman),
        new Subtheme(SubthemeTypes.Warlock)
      ];
      break;
    }
    default:
      magicArray = [];
      break;
  }
  return {
    combat: [
      new Subtheme(SubthemeTypes.WeaponSpecialization),
      new Subtheme(SubthemeTypes.Protector),
      new Subtheme(SubthemeTypes.Juggernaut)
    ],
    stealth: [
      new Subtheme(SubthemeTypes.FindWeakness),
      new Subtheme(SubthemeTypes.Riposte),
      new Subtheme(SubthemeTypes.Evasion)
    ],
    magic: magicArray
  };
}
