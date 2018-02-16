import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {Character} from "../character/character";
import {RaceType} from "../character/race/race-type.enum";

export function mockDropdownData() {
  return [
    {value: 3, label: "bob"},
    {value: 5, label: "moe"},
    {value: -1, label: "tom"}
  ] as DropdownValueObject[];
}

export function mockCharacter(name = "Bob", raceType = RaceType.Altwani) {
  const character = new Character(name, raceType);
  return character;
}
