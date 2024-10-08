import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'releaseDateFormat',
  standalone: true,
})
export class ReleaseDateFormatPipe implements PipeTransform {
  transform(date: string | undefined): string {
    if (date == undefined) return '';
    return date.substring(0, 4);
  }
}
