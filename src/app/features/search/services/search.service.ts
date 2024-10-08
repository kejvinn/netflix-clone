import { Injectable, signal } from '@angular/core';
import { TMDBService } from '../../../shared/services/tmdb.service';
import { Media } from '../../../shared/models/media.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchQuery = signal<string>('');
  searchResults = signal<Media[]>([]);

  constructor(private tmdbService: TMDBService) {}

  search(query: string) {
    this.tmdbService
      .getSearchResults(query, true)
      .subscribe((results) => this.searchResults.set(results));
  }
}
