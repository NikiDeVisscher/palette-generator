import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hex',
  standalone: true
})
export class HexPipe implements PipeTransform {

  transform(value: string): string | null {
    if (!value)
    {
      return null;
    }
    return "#" + value;
  }

}
