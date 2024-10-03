import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchService } from "./services/search.service";
import { SingleService } from "../../shared/services/single.service";

@Component({
	selector: "app-search",
	standalone: true,
	imports: [CommonModule],
	template: `<div class="search">
		@for (item of searchService.searchResults(); track item.id) {
			<div class="search-item" (click)="singleService.open(item)">
				<img
					class="search-item-poster"
					src="{{
						item.backdrop_path
							? 'https://image.tmdb.org/t/p/w300' + item.backdrop_path
							: ''
					}}"
					alt=""
				/>
				<img
					class="search-item-logo"
					src="{{
						item.logo_url
							? 'https://image.tmdb.org/t/p/w300' + item.logo_url
							: ''
					}}"
					alt="{{ item.title || item.original_name }}"
				/>
			</div>
		}
	</div>`,
	styleUrl: "./search.component.scss",
})
export class SearchComponent {
	searchService = inject(SearchService);
	singleService = inject(SingleService);
}
