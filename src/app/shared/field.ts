import {forEach} from "@angular/router/src/utils/collection";
import {Precision} from "./precision.enum";

export class Field {
  precision = Precision.None;
  // objects that hold dynamic values
  replaceValue: any = {};
  preMultiply: any = {};
  add: any = {};
  postMultiply: any = {};

  constructor(private baseValue, private defaultValue?) {

  }

  /*This function is the money shot of what makes this class useful and important.
  Calling value will return a return value that is equal to the base value.
  If replace, pre/postMultiply or add a property that matches the passed in filter
  OR
  no filter is passed in and a parameter lives on any of the replace, pre/postMultiply, add objects then those operations will be carried out.
  Examples:
  let f = new Field(3);
  f.value() //3
  f.add["sword"] = 4;
  f.value() // 3 + 4 = 7
  f.preMultiply["skills"] = 2;
  f.value() // 3 * 2 + 4 = 10
  f.replace["sword"] = 10;
  f.value() // 3 * 2 + 10 = 16
  See the spec file for more examples
  */
  value(filter?: any, precision?: Precision): any {
    let returnValue = this.baseValue;
    for (const rep in this.replaceValue) {
      if ((!filter || rep === filter) && this.replaceValue[rep]) {
        returnValue = this.replaceValue[rep];
      }
    }
    for (const pm in this.preMultiply) {
      if ((!filter || pm === filter) && this.preMultiply[pm]) {
        returnValue = Number(returnValue) * Number(this.preMultiply[pm]);
      }
    }
    for (const a in this.add) {
      if ((!filter || a === filter) && this.add[a]) {
        returnValue = Number(returnValue) + Number(this.add[a]);
      }
    }
    for (const m in this.postMultiply) {
      if ((!filter || m === filter) && this.postMultiply[m]) {
        const multi = Number(this.postMultiply[m]);
        returnValue = Number(returnValue) * multi;
      }
    }
    if (!precision) {
      precision = this.precision;
    }

    if (!returnValue) {
      return this.defaultValue;
    } else if (typeof returnValue === "number") {
      return this.round(returnValue, precision);
    } else {
      return returnValue;
    }

  }

  /*
  * isDifferentFrom will use the incoming filter to determine if the baseValue exists and if so, if rounding the base is NOT equal
  * to the value(filter).  Or in otherwords  if there is a basevalue and given a filter that value basevalue is different, then return TRUE.
  * In all other cases return false.
  * */
  isDifferentFrom(filter: any): boolean {
    return this.baseValue && this.round(this.baseValue, this.precision) !== this.value(filter);
  }

  /*Rounding function that is using a preset of determined precision values based off of the enum by the same name.*/
  round(value: any, precision: Precision = Precision.None): any {
    if (typeof value === "number") {
      return Math.floor(precision * value) / precision;
    } else {
      return value;
    }
  }

}

