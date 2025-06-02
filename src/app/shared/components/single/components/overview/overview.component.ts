import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHandThumbUp,
  heroPlus,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { TmdbImagePipe } from '../../../../pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../../../pipes/media-title.pipe';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgIconComponent, TmdbImagePipe, MediaTitlePipe],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  providers: [
    provideIcons({ heroXMark, heroPlaySolid, heroPlus, heroHandThumbUp }),
  ],
})
export class OverviewComponent {
  @Input() backdrop!: string;
  @Input() logo!: string;
  @Input() alt!: string;
  @Input() tagline!: string | undefined;
}
