/**
 * first value Theme Type
 * second value is max strength assignable to sub theme
 * third value, the name of the subtheme type for easy self referencing
 */
import {ThemeType} from "../theme-type.enum";

export enum SubthemeTypes {
  Weapon_Specialization = "Combat,Greater,Weapon_Specialization",
  Protector = "Combat,Lesser,Protector",
  Juggernaut = "Combat,Minor,Juggernaut",
  Find_Weakness = "Stealth,Greater,Find_Weakness",
  Riposte = "Stealth,Lesser,Riposte",
  Evasion = "Stealth,Minor,Evasion",
  Magent = "Magic,Minor,Magent",
  Spell_Warden = "Magic,Minor,Spell_Warden",
  Assassin = "Magic,Lesser,Assassin",
  Druid = "Magic,Lesser,Druid",
  Warrior_Mage = "Magic,Lesser,Warrior_Mage",
  Cleric = "Magic,Lesser,Cleric",
  Priest = "Magic,Greater,Priest",
  Elementalist = "Magic,Greater,Elementalist",
  Warlock = "Magic,Greater,Warlock",
  Shaman = "Magic,Greater,Shaman",
  Mage = "Magic,Greater,Mage",
  Necromancer = "Magic,Greater,Necromancer"
}
