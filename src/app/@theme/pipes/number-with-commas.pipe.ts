import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ngxNumberWithCommas' })
export class NumberWithCommasPipe implements PipeTransform {

  transform(input): string {
    if(input)
    {
    if(input[0] === '$')
    {
      let t =  new Intl.NumberFormat().format(input.slice(1));
      return '$'+t;
    }
    return new Intl.NumberFormat().format(input);
  }
}

}
