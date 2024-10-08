import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from './services/search.service';
import { SingleService } from '../../shared/services/single.service';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../shared/pipes/media-title.pipe';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, TmdbImagePipe, MediaTitlePipe],
  template: `<div class="search">
    @for (item of searchService.searchResults(); track item.id) {
      <div class="search-item" (click)="singleService.open(item)">
        <img
          class="search-item-poster"
          logo_url
          src="{{ item.backdrop_path | tmdbImage: 'w300' }}"
          alt=""
        />
        <img
          class="search-item-logo"
          src="{{ item.logo_url | tmdbImage: 'w200' }}"
          alt="{{ item | mediaTitle }}"
        />
      </div>
    }
  </div>`,
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchService = inject(SearchService);
  singleService = inject(SingleService);
}
