import { Pipe, PipeTransform } from '@angular/core';
import { CastMember } from '../models/cast-member.model';

@Pipe({
  name: 'mediaCast',
  standalone: true,
})
export class MediaCastPipe implements PipeTransform {
  transform(cast: CastMember[], limit: number): string | undefined {
    let result = '';
    let more = false;

    if (cast.length > limit) {
      more = true;
      cast = cast.slice(0, limit);
    }

    if (cast.length === 0) return undefined;

    for (let i = 0; i < cast.length; i++) {
      result = result.concat(
        cast[i].name + (cast.length !== i + 1 ? ', ' : more ? ', more' : ''),
      );
    }

    return result;
  }
}
