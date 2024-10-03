import { CastMember } from "./cast-member.model";
import { Genre } from "./genre.model";

export interface Media {
	id: number;
	original_name: string;
	adult: boolean;
	backdrop_path: string;
	poster_url: string;
	genre_ids: number[];
	original_language: string;
	overview: string;
	release_date: string;
	title: string;
	media_type: string;
	vote_average: number;
	video_url: string;
	logo_url: string;
	runtime: number;
	tagline: string;
	cast: CastMember[];
	genres: Genre[];
	recommendations: Media[];
}
