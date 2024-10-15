import { Injectable, signal } from '@angular/core';
import { TMDBService } from '../../../shared/services/tmdb.service';
import { Media } from '../../../shared/models/media.model';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchQuery = signal<string>('');
  searchResults = signal<Media[]>([]);
  subscription!: Subscription;
  searching = signal<boolean>(false);

  constructor(private tmdbService: TMDBService) {}

  search(query: string) {
    this.subscription = this.tmdbService
      .getSearchResults(query, true)
      .subscribe((results) => this.searchResults.set(results));
  }

  stopSearch() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.searchResults.set([]);
    this.searching.set(false);
  }
}
