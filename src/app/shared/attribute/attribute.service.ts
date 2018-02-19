import {Injectable} from '@angular/core';
import {DropdownValueObject} from "../ui/dropdown/dropdown-value-object";
import {Level} from "../character/level.enum";

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

  /*Takes in an enumeration and uses the keys and values to insert them into a dropdown value object. i.e. {label: "Normal" value: 0}.
  If the isAttribute boolean is set to true then the label is appended wrapped in parenthesis like {label: "Normal (0), value: 0}"*/
  getArrayOfDropdownValueObjectsFromEnum(enumeration, isAttribute = false): DropdownValueObject[] {
    const results: DropdownValueObject[] = [];
    const names = this.getEnumAsArrayOfStrings(enumeration);
    for (const name of names) {
      if (!isAttribute) {
        results.push({value: enumeration[name], label: name});
      } else {
        const attributeName = name + " (" + enumeration[name] + ")";
        results.push({value: enumeration[name], label: attributeName});
      }
    }
    return results;
  }

  buildArrayAsDropdownArray(array: any[]) {
    const results: DropdownValueObject[] = [];
    for (const a of array) {
      results.push({value: a, label: a});
    }
    return results;
  }

  getLevelAsArray(): Array<Level> {
    return [Level.One, Level.Two, Level.Three, Level.Four, Level.Five, Level.Six, Level.Seven, Level.Eight, Level.Nine, Level.Ten];
  }

}
