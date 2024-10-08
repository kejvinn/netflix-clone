import { Component, inject, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroInformationCircle,
  heroSpeakerWave,
  heroSpeakerXMark,
} from '@ng-icons/heroicons/outline';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TMDBService } from '../../../../shared/services/tmdb.service';
import { Media } from '../../../../shared/models/media.model';
import { SingleService } from '../../../../shared/services/single.service';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../../../shared/pipes/media-title.pipe';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [NgIconComponent, CommonModule, TmdbImagePipe, MediaTitlePipe],
  providers: [
    TMDBService,
    provideIcons({
      heroPlaySolid,
      heroInformationCircle,
      heroSpeakerWave,
      heroSpeakerXMark,
    }),
  ],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss',
})
export class FeaturedComponent implements OnInit {
  constructor(private tmdbService: TMDBService) {}

  singleService = inject(SingleService);

  featured$: Observable<Media> = new Observable<Media>();

  ngOnInit() {
    this.featured$ = this.tmdbService.getFeaturedMedia('all', 'day');
  }

  openInfo() {
    this.featured$.subscribe((media) => this.singleService.open(media));
  }

  muteVideo(video: HTMLVideoElement) {
    video.muted = !video.muted;
  }
}
