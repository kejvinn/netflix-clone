import { Injectable, signal } from "@angular/core";
import { Media } from "../models/media.model";
import { TMDBService } from "./tmdb.service";
import { concatMap, forkJoin, map, mergeMap, of, switchMap, tap } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class SingleService {
	showModal = signal<boolean>(false);
	media = signal<Media | null>(null);

	constructor(private tmdb: TMDBService) {}

	open(media: Media) {
		this.tmdb
			.getMedia(media.media_type, media.id)
			.pipe(
				mergeMap((data: Media) => this.tmdb.setMediaLogo(data)),
				mergeMap((data: Media) => this.tmdb.setMediaCredits(data)),
				mergeMap((data: Media) =>
					this.tmdb.setMediaRecommendations(data).pipe(
						mergeMap((data: Media) =>
							forkJoin(
								data.recommendations.map((recommendation) =>
									this.tmdb.setMediaLogo(recommendation),
								),
							).pipe(
								map((recommendations) => {
									data.recommendations = recommendations;
									return data;
								}),
							),
						),
					),
				),
			)
			.subscribe((media: Media) => {
				media.release_date = new Date(media.release_date)
					.getFullYear()
					.toFixed();
				this.media.set(media);
				this.showModal.set(true);
			});
	}
	close() {
		this.showModal.set(false);
		this.media.set(null);
	}
}
