import { Pipe, PipeTransform } from '@angular/core';
import { Media } from '../models/media.model';

@Pipe({
  name: 'mediaTitle',
  standalone: true,
})
export class MediaTitlePipe implements PipeTransform {
  transform(media: Media | null): string {
    if (media === null) return '';
    if (media.media_type === 'tv') {
      return media.name || media.original_name;
    } else {
      return media.title || media.original_title;
    }
  }
}
