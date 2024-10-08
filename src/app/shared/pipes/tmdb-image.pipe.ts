import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tmdbImage',
  standalone: true,
})
export class TmdbImagePipe implements PipeTransform {
  transform(url: string | undefined, size: string | undefined): string {
    if (url == '' || size == '') return '';
    if (url == undefined || size == undefined) return '';
    return `https://image.tmdb.org/t/p/${size}${url}`;
  }
}
