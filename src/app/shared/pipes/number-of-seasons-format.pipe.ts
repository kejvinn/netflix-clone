import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberOfSeasonsFormat',
  standalone: true,
})
export class NumberOfSeasonsFormatPipe implements PipeTransform {
  transform(seasons: number | undefined): string {
    if (seasons === undefined) return '';

    return seasons === 1 ? '1 Season' : seasons + ' Seasons';
  }
}
