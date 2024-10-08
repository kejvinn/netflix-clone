import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHandThumbUp,
  heroPlus,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { Media } from '../../models/media.model';
import { Observable } from 'rxjs';
import { SingleService } from '../../services/single.service';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { CommonModule } from '@angular/common';
import { RuntimeFormatPipe } from '../../pipes/runtime-format.pipe';
import { ReleaseDateFormatPipe } from '../../pipes/release-date-format.pipe';
import { NumberOfSeasonsFormatPipe } from '../../pipes/number-of-seasons-format.pipe';
import { TmdbImagePipe } from '../../pipes/tmdb-image.pipe';
import { OverviewComponent } from './ui/overview/overview.component';
import { RecommendationComponent } from './ui/recommendation/recommendation.component';
import { DetailsComponent } from './ui/details/details.component';
import { CreditsComponent } from './ui/credits.component';
import { MediaTitlePipe } from '../../pipes/media-title.pipe';

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
  ],
  providers: [
    provideIcons({ heroXMark, heroPlaySolid, heroPlus, heroHandThumbUp }),
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {
  Media: Observable<Media> = new Observable<Media>();

  singleService = inject(SingleService);

  openInfo(media: Media) {
    this.singleService.open(media);
  }
}
