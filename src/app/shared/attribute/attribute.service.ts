import {Injectable} from '@angular/core';
import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";

@Injectable()
export class AttributeService {

  constructor() {
  }

  getEnumAsArrayOfStrings(enumeration, isStringBased = false): string[] {
    let names;
    if (!isStringBased) {
      names = Object.keys(enumeration).filter((keys) => {
        return !(parseInt(keys, 10) >= 0);
      });
    } else {
      names = Object.values(enumeration).filter((values) => {
        return !(parseInt(values, 10) >= 0);
      });
    }
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
