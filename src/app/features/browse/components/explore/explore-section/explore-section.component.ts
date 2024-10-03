import {
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	EventEmitter,
	Input,
	Output,
} from "@angular/core";
import { Observable } from "rxjs";

import { CommonModule } from "@angular/common";
import { Media } from "../../../../../shared/models/media.model";
import { TMDBService } from "../../../../../shared/services/tmdb.service";

@Component({
	selector: "app-explore-section",
	standalone: true,
	imports: [CommonModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<div class="explore-section">
			<div class="explore-section-title">{{ title }}</div>
			<swiper-container
				class="explore-section-items"
				keyboar-control="true"
				momentum="false"
				slides-per-view="auto"
				space-between="10"
			>
				@for (item of items$ | async; track item.id) {
					@defer (on viewport) {
						<swiper-slide
							class="items-single"
							loading="lazy"
							(click)="handleInfo(item)"
						>
							<img
								class="items-single-poster"
								loading="lazy"
								decode="async"
								src="https://image.tmdb.org/t/p/w500{{ item.backdrop_path }}"
								alt=""
							/>
							<img
								class="items-single-logo"
								loading="lazy"
								decode="async"
								src="https://image.tmdb.org/t/p/w200{{ item.logo_url }}"
								alt="{{ item.title }}"
							/>
						</swiper-slide>
					} @loading {
						<div class="items-single placeholder"></div>
					} @placeholder {
						<div class="items-single placeholder"></div>
					}
				}
			</swiper-container>
		</div>
	`,
	styleUrl: "./explore-section.component.scss",
})
export class ExploreSectionComponent {
	@Input() title!: string;
	@Input() type!: string;
	@Input() period!: string;
	@Output() info = new EventEmitter<Media>();

	items$: Observable<Media[]> = new Observable();

	constructor(private tmdbService: TMDBService) {}

	ngOnInit() {
		this.items$ = this.tmdbService.getTrendingWithLogo(this.type, this.period);
	}

	handleInfo(media: Media) {
		this.info.emit(media);
	}
}
