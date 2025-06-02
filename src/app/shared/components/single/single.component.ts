import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChevronDown,
  heroChevronUp,
  heroHandThumbUp,
  heroPlus,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { Media } from '../../models/media.model';
import { SingleService } from '../../services/single.service';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { CommonModule } from '@angular/common';
import { RuntimeFormatPipe } from '../../pipes/runtime-format.pipe';
import { ReleaseDateFormatPipe } from '../../pipes/release-date-format.pipe';
import { NumberOfSeasonsFormatPipe } from '../../pipes/number-of-seasons-format.pipe';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';
import { OverviewComponent } from './components/overview/overview.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { DetailsComponent } from './components/details/details.component';
import { CreditsComponent } from './components/credits.component';
import { MediaTitlePipe } from '../../pipes/media-title.pipe';
import { MediaCastPipe } from '../../pipes/media-cast.pipe';
import { MediaGenresPipe } from '../../pipes/media-genres.pipe';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    RuntimeFormatPipe,
    ReleaseDateFormatPipe,
    NumberOfSeasonsFormatPipe,
    TmdbImagePipe,
    OverviewComponent,
    DetailsComponent,
    RecommendationComponent,
    CreditsComponent,
    MediaTitlePipe,
    MediaCastPipe,
    MediaGenresPipe,
  ],
  providers: [
    provideIcons({
      heroXMark,
      heroPlaySolid,
      heroPlus,
      heroHandThumbUp,
      heroChevronUp,
      heroChevronDown,
    }),
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
  animations: [
    trigger('expand', [
      state(
        'expanded',
        style({
          height: '*',
        }),
      ),
      state(
        'collapsed',
        style({
          height: '62rem',
        }),
      ),
      transition('collapsed <=> expanded', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class SingleComponent {
  expanded = false;
  singleService = inject(SingleService);

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  openInfo(media: Media) {
    this.singleService.open(media);
  }
}
