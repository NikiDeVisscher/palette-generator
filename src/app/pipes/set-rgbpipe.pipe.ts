import { Pipe, PipeTransform } from '@angular/core';
import { Colour } from '../models/colour.model';

@Pipe({
  name: 'setRGBpipe',
  standalone: true
})
export class SetRGBpipePipe implements PipeTransform {

  transform(colour: Colour): string {
    var value = '';

    if (colour != null)
   {
     value += 'rgb(';
      value += colour.rValue + ', ';
      value += colour.gValue + ', ';
      value += colour.bValue + ')';
    }
    else
      value += 'rgb(0, 0, 0)';

    return value;

  }

}
