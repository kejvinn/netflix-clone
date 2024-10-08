import { Injectable, signal } from '@angular/core';
import { Media } from '../models/media.model';
import { TMDBService } from './tmdb.service';
import { from, map, mergeMap, Subscription, switchMap, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SingleService {
  showModal = signal<boolean>(false);
  media = signal<Media | null>(null);
  subscription!: Subscription;
  constructor(private tmdb: TMDBService) {}

  open(media: Media) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.media.set(null);
    this.showModal.set(true);

    this.subscription = this.tmdb
      .getMedia(media.media_type, media.id)
      .pipe(
        switchMap((data: Media) => this.tmdb.setMediaLogo(data)),
        switchMap((data: Media) => this.tmdb.setMediaCredits(data)),
        switchMap((data: Media) =>
          this.tmdb.setMediaRecommendations(data).pipe(
            mergeMap((data: Media) =>
              from(data.recommendations).pipe(
                mergeMap((rec: Media) => {
                  return this.tmdb.setMediaLogo(rec);
                }),
                toArray(),
                map((recs: Media[]) => {
                  data.recommendations = recs;
                  return data;
                }),
              ),
            ),
          ),
        ),
      )
      .subscribe((media: Media) => {
        this.media.set(media);
        console.log(media);
      });
  }
  close() {
    this.showModal.set(false);
    this.media.set(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
