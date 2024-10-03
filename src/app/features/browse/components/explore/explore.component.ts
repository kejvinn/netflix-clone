import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { ExploreSectionComponent } from "./explore-section/explore-section.component";
import { ExploreSection } from "../../../../shared/models/explore-section.model";
import { SingleService } from "../../../../shared/services/single.service";
import { Media } from "../../../../shared/models/media.model";

@Component({
	selector: "app-explore",
	standalone: true,
	imports: [ExploreSectionComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,

	template: `
		<div class="explore">
			@for (section of sections; track section.title) {
				@defer (on viewport) {
					<app-explore-section
						(info)="onInfo($event)"
						[title]="section.title"
						[type]="section.type"
						[period]="section.period"
					></app-explore-section>
				} @placeholder {
					<div class="explore-section placeholder">
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
						<div class="explore-section-section-item placeholder "></div>
					</div>
				} @loading {
					<div class="explore-section placeholder"></div>
				}
			}
		</div>
	`,
	styles: `
		$small: 500px;
		$medium: 900px;
		.explore {
			display: flex;
			flex-direction: column;
			padding: 0 0 0 4rem;
			gap: 1rem;
			flex-grow: 1;
			margin-top: -4rem;
			margin-bottom: 1.5rem;
			@media screen and (max-width: $medium) {
				padding: 0 0 0 2rem;
				margin-top: 0rem;
			}
			@media screen and (max-width: $small) {
				padding: 0 0 0 0.5rem;
				margin-top: 0rem;
			}
		}
	`,
})
export class ExploreComponent {
	sections: ExploreSection[] = [
		{ title: "Trending Today", type: "all", period: "day" },
		{ title: "Trending This Week", type: "all", period: "week" },
		{ title: "Popular Series", type: "tv", period: "week" },
		{ title: "Popular Movies", type: "movie", period: "week" },
	];

	singleService = inject(SingleService);

	onInfo(media: Media) {
		this.singleService.open(media);
	}
}
