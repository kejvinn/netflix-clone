import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '../models/media.model';

@Pipe({
  name: 'releaseDateFormat',
  standalone: true,
})
export class ReleaseDateFormatPipe implements PipeTransform {
  transform(media: Media | null): string {
    if (media === null) return '';
    if (media.release_date) return media.release_date.substring(0, 4);
    if (media.first_air_date) return media.first_air_date.substring(0, 4);
    return '';
  }
}
