import {Pipe, PipeTransform} from '@angular/core';

/**
 * This is responsible for adding a space between all capitalized letters.
 * TimmyTommyTaughtUS would be Timmy Tommy Taught U S
 */
@Pipe({
  name: 'subthemesPipe'
})
export class SubthemePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      const resultArray = value.replace(/[A-Z]/g, " $&");
      return resultArray.trim();
    } else {
      return value;
    }

  }

}
