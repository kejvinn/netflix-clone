import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SearchService } from './services/search.service';
import { SingleService } from '../../shared/services/single.service';
import { TmdbImagePipe } from '../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../shared/pipes/media-title.pipe';
import { MediaSlideComponent } from '../../shared/components/media-poster.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, TmdbImagePipe, MediaTitlePipe, MediaSlideComponent],
  template: `<div class="search" (click)="this.location.back()">
    @for (item of searchService.searchResults(); track item.id) {
      <div class="search-item" (click)="singleService.open(item)">
        <app-media-poster
          [backdrop]="item.backdrop_path | tmdbImage: 'w500'"
          [logo]="item.logo_url | tmdbImage: 'w300'"
          [alt]="item | mediaTitle"
        ></app-media-poster>
      </div>
    }
  </div>`,
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  searchService = inject(SearchService);
  singleService = inject(SingleService);
  location = inject(Location);

  ngOnDestroy() {
    this.searchService.stopSearch();
  }
}
