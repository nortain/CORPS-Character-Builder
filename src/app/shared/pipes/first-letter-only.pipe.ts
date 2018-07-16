import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterOnly'
})
export class FirstLetterOnlyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const resultArray = value.replace(/[^A-Z]/g, "");
      return resultArray.trim();
    } else {
      return value;
    }

  }

}
