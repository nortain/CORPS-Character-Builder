import {Injectable} from '@angular/core';
import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";

@Injectable()
export class AttributeService {

  constructor() {
  }

  getEnumAsArrayOfStrings(enumeration): string[] {
    const names = Object.keys(enumeration).filter((value) => {
      return !(parseInt(value, 10) >= 0);
    });
    return names;
  }

  getArrayOfDropdownValueObjectsFromEnum(enumeration): DropdownValueObject[] {
    const results: DropdownValueObject[] = [];
    const names = this.getEnumAsArrayOfStrings(enumeration);
    for (const name of names) {
      results.push({value: enumeration[name], label: name});
    }
    return results;
  }


}
