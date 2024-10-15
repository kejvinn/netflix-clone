import { Component, inject } from '@angular/core';
import { ExploreSection } from '../../../../shared/models/explore-section.model';
import { SingleService } from '../../../../shared/services/single.service';
import { Media } from '../../../../shared/models/media.model';
import { ExploreSectionComponent } from './ui/explore-section/explore-section.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [ExploreSectionComponent],

  template: `
    <div class="explore">
      @for (section of sections; track section.title) {
        <app-explore-section
          (info)="onInfo($event)"
          [title]="section.title"
          [mediaType]="section.mediaType"
          [listType]="section.listType"
          [period]="section.period"
        ></app-explore-section>
      }
    </div>
  `,
  styles: `
    .explore {
      display: flex;
      flex-direction: column;
      padding: 0 0 0 4rem;
      gap: 1rem;
      flex-grow: 1;
      margin-top: -4rem;
      margin-bottom: 1.5rem;

      @media screen and (max-width: 900px) {
        padding: 0 0 0 2rem;
        margin-top: 0rem;
      }
      @media screen and (max-width: 500px) {
        padding: 0 0 0 0.5rem;
        margin-top: 0.5rem;
      }
    }
  `,
})
export class ExploreComponent {
  sections: ExploreSection[] = [
    {
      title: 'Trending Today',
      listType: 'trending',
      mediaType: 'all',
      period: 'day',
    },
    {
      title: 'Trending This Week',
      mediaType: 'all',
      period: 'week',
      listType: 'trending',
    },
    {
      title: 'Popular Series',
      mediaType: 'tv',
      period: 'week',
      listType: 'trending',
    },
    {
      title: 'Popular Movies',
      mediaType: 'movie',
      period: 'week',
      listType: 'trending',
    },
    {
      title: 'Top Rated Series',
      mediaType: 'tv',
      listType: 'top_rated',
      period: '',
    },
    {
      title: 'Top Rated Movies',
      mediaType: 'movie',
      listType: 'top_rated',
      period: '',
    },
  ];

  singleService = inject(SingleService);

  onInfo(media: Media) {
    this.singleService.open(media);
  }
}
