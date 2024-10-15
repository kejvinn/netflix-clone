import { Injectable, signal } from '@angular/core';
import { Media } from '../models/media.model';
import { TMDBService } from './tmdb.service';
import { Subject, switchMap, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleService {
  showModal = signal<boolean>(false);
  close$: Subject<boolean> = new Subject<boolean>();
  media = signal<Media | null>(null);

  constructor(private tmdb: TMDBService) {}

  open(media: Media) {
    this.media.set(null);
    this.showModal.set(true);

    this.tmdb
      .getMedia(media.media_type, media.id)
      .pipe(
        switchMap((media: Media) => this.tmdb.setMediaLogo(media)), // Adding logo to the media
        switchMap((media: Media) => this.tmdb.setMediaCredits(media)), // Adding credits to the media
        switchMap((media: Media) =>
          this.tmdb.setMediaRecommendations(media, true),
        ),
        takeUntil(this.close$),
      )
      .subscribe((media: Media) => {
        this.media.set(media);
        console.log(this.media());
      });
  }
  close() {
    this.showModal.set(false);
    this.media.set(null);
    this.close$.next(true);
  }
}
