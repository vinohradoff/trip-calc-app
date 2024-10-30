import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true,
})
export class RoundPipe implements PipeTransform {
  transform(value: number, count?: number): number {
    return count ? Number(value.toFixed(count)) : Math.floor(value);
  }
}
