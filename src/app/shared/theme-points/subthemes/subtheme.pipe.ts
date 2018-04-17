import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'subthemes'
})
export class SubthemePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let resultString = "";
    if (value) {
      const resultArray = value.split("_");
      for (const r of resultArray) {
        resultString += r + " ";
      }
      return resultString.trim();
    } else {
      return value;
    }

  }

}
