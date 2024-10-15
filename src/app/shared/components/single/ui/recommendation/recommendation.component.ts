import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlus } from '@ng-icons/heroicons/outline';
import { Media } from '../../../../models/media.model';
import { MediaSlideComponent } from '../../../media-poster.component';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [CommonModule, NgIconComponent, MediaSlideComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss',
  providers: [provideIcons({ heroPlus })],
})
export class RecommendationComponent {
  @Input() backdrop!: string;
  @Input() logo!: string;
  @Input() alt!: string;
  @Input() releaseDate!: string;
  @Input() voteAverage!: string;
  @Input() rating!: string;
  @Input() overview!: string;
  @Output() info = new EventEmitter<Media>();
  openInfo(media: Media | null) {
    if (media === null) return;
    this.info.emit(media);
  }
}
