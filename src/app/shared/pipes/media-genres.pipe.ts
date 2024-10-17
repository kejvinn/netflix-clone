import { Pipe, PipeTransform } from '@angular/core';
import { Genre } from '../models/genre.model';

@Pipe({
  name: 'mediaGenres',
  standalone: true,
})
export class MediaGenresPipe implements PipeTransform {
  transform(
    genres: Genre[],
    limit: number = Number.MAX_VALUE,
  ): string | undefined {
    let result = '';
    let more = false;
    if (genres.length > limit) {
      more = true;
      genres = genres.slice(0, limit);
    }

    if (genres.length === 0) return undefined;

    for (let i = 0; i < genres.length; i++) {
      result = result.concat(
        genres[i].name +
          (genres.length !== i + 1 ? ', ' : more ? ', more' : ''),
      );
    }

    return result;
  }
}
