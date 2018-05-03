/**
 * first value Theme Type
 * second value is max strength assignable to sub theme
 * third value, the name of the subtheme type for easy self referencing
 */
import {ThemeType} from "../theme-type.enum";

export enum SubthemeTypes {
  WeaponSpecialization = "Combat,Greater,WeaponSpecialization",
  Protector = "Combat,Lesser,Protector",
  Juggernaut = "Combat,Minor,Juggernaut",
  FindWeakness = "Stealth,Greater,FindWeakness",
  Riposte = "Stealth,Lesser,Riposte",
  Evasion = "Stealth,Minor,Evasion",
  Magent = "Magic,Minor,Magent",
  SpellWarden = "Magic,Minor,SpellWarden",
  Assassin = "Magic,Lesser,Assassin",
  Druid = "Magic,Lesser,Druid",
  WarriorMage = "Magic,Lesser,WarriorMage",
  Cleric = "Magic,Lesser,Cleric",
  Priest = "Magic,Greater,Priest",
  Elementalist = "Magic,Greater,Elementalist",
  Warlock = "Magic,Greater,Warlock",
  Shaman = "Magic,Greater,Shaman",
  Mage = "Magic,Greater,Mage",
  Necromancer = "Magic,Greater,Necromancer"
}
