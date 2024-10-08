import { CastMember } from './cast-member.model';
import { Genre } from './genre.model';

export interface Media {
  id: number;
  title: string;
  name: string;
  original_title: string;
  original_name: string;
  adult: boolean;
  backdrop_path: string;
  poster_url: string;
  original_language: string;
  overview: string;
  release_date: string;
  media_type: string;
  vote_average: number;
  video_url: string;
  logo_url: string;
  runtime: number;
  number_of_seasons: number;
  tagline: string;
  cast: CastMember[];
  genres: Genre[];
  recommendations: Media[];
  popularity: number;
}
