import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media } from '../models/media.model';
import { forkJoin, iif, map, mergeMap, Observable, of } from 'rxjs';
import { VideoDto } from '../dto/video-dto.model';
import { ImageDto } from '../dto/image-dto.model';
import { CastMember } from '../models/cast-member.model';

@Injectable({
  providedIn: 'root',
})
export class TMDBService {
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getList(
    listType: string,
    mediaType: string,
    period: string = '',
    withLogos: boolean = false,
  ): Observable<Media[]> {
    if (listType === 'trending') {
      return this.getTrending(mediaType, period, withLogos);
    } else if (listType === 'top_rated') {
      return this.getTopRated(mediaType, withLogos);
    } else {
      return new Observable<Media[]>();
    }
  }

  getTrending(
    mediaType: string,
    period: string,
    withLogos: boolean = false,
  ): Observable<Media[]> {
    return this.http
      .get<{
        results: Media[];
      }>(`${this.apiUrl}/trending/${mediaType}/${period}?language=en-US`)
      .pipe(
        map((data) => data?.results),
        map((list: Media[]) =>
          list.filter((media) => ['tv', 'movie'].includes(media.media_type)),
        ),
        mergeMap((list: Media[]) =>
          iif(
            () => withLogos,
            forkJoin(list.map((media: Media) => this.setMediaLogo(media))),
            of(list),
          ),
        ),
      );
  }

  getTopRated(
    mediaType: string,
    withLogos: boolean = false,
  ): Observable<Media[]> {
    return this.http
      .get<{
        results: Media[];
      }>(`${this.apiUrl}/${mediaType}/top_rated`)
      .pipe(
        map((data) => data.results),
        mergeMap((list: Media[]) =>
          iif(
            () => withLogos,
            forkJoin(
              list.map((media: Media) =>
                this.setMediaLogo({ ...media, media_type: mediaType }),
              ),
            ),
            of(list),
          ),
        ),
      );
  }

  getSearchResults(
    query: string,
    withLogos: boolean = false,
  ): Observable<Media[]> {
    return this.http
      .get<{
        results: Media[];
      }>(`${this.apiUrl}/search/multi?query=${query}&include_adult=true&page=1`)
      .pipe(
        map((data) =>
          data.results
            .sort((a: Media, b: Media) => b.popularity - a.popularity)
            .filter((media: Media) =>
              ['tv', 'movie'].includes(media.media_type),
            ),
        ),
        withLogos
          ? mergeMap((trending: Media[]) =>
              forkJoin(
                trending.map((media: Media) => this.setMediaLogo(media)),
              ),
            )
          : (data) => data,
      );
  }

  getMedia(type: string, id: number): Observable<Media> {
    return this.http.get<Media>(`${this.apiUrl}/${type}/${id}`).pipe(
      map((data) => {
        data.media_type = type;
        return data;
      }),
    );
  }

  getFeaturedMedia(type: string, period: string): Observable<Media> {
    return this.getTrending(type, period).pipe(
      map((data: Media[]) => data[0]),
      mergeMap((media: Media) => this.setMediaLogo(media)),
    );
  }

  setMediaVideo(media: Media) {
    return this.http
      .get<{
        results: VideoDto[];
      }>(`${this.apiUrl}/${media.media_type}/${media.id}/videos`)
      .pipe(
        map((data: { results: VideoDto[] }) => {
          media.video_url =
            data.results.find(
              (video: VideoDto) =>
                video.site === 'YouTube' &&
                video.type === 'Trailer' &&
                video.official === true,
            )?.key || '';
          return media;
        }),
      );
  }

  setMediaLogo(media: Media) {
    return this.http
      .get<{
        logos: ImageDto[];
      }>(
        `${this.apiUrl}/${media.media_type}/${media.id}/images?include_image_language=en%2C${media.original_language}%2Cnull`,
      )
      .pipe(
        map((data) => {
          media.logo_url =
            data.logos?.sort((a: ImageDto, b: ImageDto) => {
              const getLangPriority = (iso: string | null) =>
                iso === 'en'
                  ? 1
                  : iso === media.original_language
                    ? 2
                    : iso === null
                      ? 3
                      : 4;
              const aLangPriority = getLangPriority(a.iso_639_1);

              const bLangPriority = getLangPriority(b.iso_639_1);

              if (getLangPriority(a.iso_639_1) !== bLangPriority) {
                return aLangPriority - bLangPriority;
              }

              return b.vote_count - a.vote_count;
            })[0]?.file_path || '';

          return media;
        }),
      );
  }

  setMediaCredits(media: Media) {
    return this.http
      .get<{
        cast: CastMember[];
      }>(`${this.apiUrl}/${media.media_type}/${media.id}/credits`)
      .pipe(
        map((data) => {
          media.cast = data.cast;
          return media;
        }),
      );
  }
  setMediaRecommendations(media: Media, withLogos: boolean = false) {
    return this.http
      .get<{
        results: Media[];
      }>(`${this.apiUrl}/${media.media_type}/${media.id}/recommendations`)
      .pipe(
        map((recs: { results: Media[] }) => recs.results),
        mergeMap((recs: Media[]) =>
          iif(
            () => withLogos && recs.length !== 0,
            forkJoin(recs.map((media: Media) => this.setMediaLogo(media))),
            of(recs),
          ),
        ),
        map((recs: Media[]) => {
          media.recommendations = recs;
          return media;
        }),
      );
  }
}
