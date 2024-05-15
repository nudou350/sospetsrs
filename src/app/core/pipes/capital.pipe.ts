import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'appCapital',
  standalone: true,
})
export class CapitalPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (!value) return value; // return as is if value is null or empty
    return `${value[0].toUpperCase()}${value.slice(1)}`;
  }

}
