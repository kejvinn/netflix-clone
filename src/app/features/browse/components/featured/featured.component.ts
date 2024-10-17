import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroInformationCircle,
  heroSpeakerWave,
  heroSpeakerXMark,
} from '@ng-icons/heroicons/outline';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TMDBService } from '../../../../shared/services/tmdb.service';
import { Media } from '../../../../shared/models/media.model';
import { SingleService } from '../../../../shared/services/single.service';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../../../shared/pipes/media-title.pipe';
import { PlayButtonComponent } from '../../../../shared/components/play-button.component';
import { InfoButtonComponent } from '../../../../shared/components/info-button.component';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [
    NgIcon,
    CommonModule,
    TmdbImagePipe,
    MediaTitlePipe,
    PlayButtonComponent,
    InfoButtonComponent,
  ],
  providers: [
    provideIcons({
      heroInformationCircle,
      heroSpeakerWave,
      heroSpeakerXMark,
    }),
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent {
  tmdbService = inject(TMDBService);
  singleService = inject(SingleService);

  featured$: Observable<Media> = this.tmdbService.getFeaturedMedia(
    'all',
    'week',
  );

  openInfo(featured: Media) {
    this.singleService.open(featured);
  }

  muteVideo(video: HTMLVideoElement) {
    video.muted = !video.muted;
  }
}
