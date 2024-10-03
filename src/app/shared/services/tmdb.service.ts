import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Media } from "../models/media.model";
import { filter, forkJoin, map, mergeMap, Observable, switchMap } from "rxjs";
import { VideoDto } from "../dto/video-dto.model";
import { ImageDto } from "../dto/image-dto.model";
import { CastMember } from "../models/cast-member.model";

@Injectable({
	providedIn: "root",
})
export class TMDBService {
	private apiUrl = "https://api.themoviedb.org/3";
	// private accessKey = '3ed3a128ec56ff0cc0eb876ef2966a49';

	constructor(private http: HttpClient) {}

	getTrending(type: string, period: string): Observable<Media[]> {
		return this.http
			.get<{
				results: Media[];
			}>(`${this.apiUrl}/trending/${type}/${period}`)
			.pipe(map((data) => data.results));
	}

	getTrendingWithLogo(type: string, period: string): Observable<Media[]> {
		return this.getTrending(type, period).pipe(
			mergeMap((trending: Media[]) =>
				forkJoin(trending.map((media: Media) => this.setMediaLogo(media))),
			),
		);
	}

	getSearchResults(query: string): Observable<Media[]> {
		return this.http
			.get<{
				results: Media[];
			}>(`${this.apiUrl}/search/multi?query=${query}&include_adult=true&page=1`)
			.pipe(
				map((data) =>
					data.results.filter((media: Media) =>
						["tv", "movie"].includes(media.media_type),
					),
				),
			);
	}

	getSearchResultsWithLogo(query: string): Observable<Media[]> {
		return this.getSearchResults(query).pipe(
			mergeMap((searchResults: Media[]) =>
				forkJoin(searchResults.map((media: Media) => this.setMediaLogo(media))),
			),
		);
	}

	getMedia(type: string, id: number): Observable<Media> {
		return this.http.get<Media>(`${this.apiUrl}/${type}/${id}`).pipe(
			map((data) => {
				data.media_type = type;
				return data;
			}),
		);
		// .pipe(mergeMap((media: Media) => this.setMediaVideo(media)));
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
								video.site === "YouTube" &&
								video.type === "Trailer" &&
								video.official === true,
						)?.key || "";
					return media;
				}),
			);
	}

	setMediaLogo(media: Media) {
		return this.http
			.get<{
				logos: ImageDto[];
			}>(`${this.apiUrl}/${media.media_type}/${media.id}/images?language=en`)
			.pipe(
				map((data) => {
					media.logo_url =
						data.logos?.sort(
							(a: ImageDto, b: ImageDto) => b.vote_average - a.vote_average,
						)[0]?.file_path || "";
					return media;
				}),
			);
	}

	setMediaCredits(media: Media) {
		return this.http
			.get<{
				cast: CastMember[];
			}>(`${this.apiUrl}/${media.media_type}/${media.id}/credits?language=en`)
			.pipe(
				map((data) => {
					media.cast = data.cast;
					return media;
				}),
			);
	}
	setMediaRecommendations(media: Media) {
		return this.http
			.get<{
				results: Media[];
			}>(
				`${this.apiUrl}/${media.media_type}/${media.id}/recommendations?language=en`,
			)
			.pipe(
				map((data) => {
					media.recommendations = data.results;
					return media;
				}),
			);
	}
}
