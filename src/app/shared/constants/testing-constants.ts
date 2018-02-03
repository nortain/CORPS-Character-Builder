import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";

export function mockDropdownData() {
  return [
    {value: 3, label: "bob"},
    {value: 5, label: "moe"},
    {value: -1, label: "tom"}
  ] as DropdownValueObject[];
}
