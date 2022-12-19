import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodificaSesso'
})
export class DecodificaSessoPipe implements PipeTransform {

  transform(sesso: string | undefined): unknown {
    return sesso === 'MASCHIO' ? 'M' : 'F';
  }

}
