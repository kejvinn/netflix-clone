import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '../models/media.model';

@Pipe({
  name: 'runtimeFormat',
  standalone: true,
})
export class RuntimeFormatPipe implements PipeTransform {
  transform(rec: Media | null): string {
    if (rec === null) return '';
    if (rec.runtime) {
      const h = Math.floor(rec.runtime / 60);
      const m = rec.runtime % 60;
      return `${h}h ${m}m`;
    }

    if (rec.number_of_seasons) {
      return rec.number_of_seasons === 1
        ? '1 season'
        : `${rec.number_of_seasons} seasons`;
    }
    return '';
  }
}
