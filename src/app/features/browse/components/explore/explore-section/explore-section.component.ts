import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Media } from '../../../../../shared/models/media.model';
import { TMDBService } from '../../../../../shared/services/tmdb.service';
import { TmdbImagePipe } from '../../../../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../../../../shared/pipes/media-title.pipe';
import { MediaSlideComponent } from '../../../../../shared/components/media-slide.component';
import { SingleService } from '../../../../../shared/services/single.service';

@Component({
  selector: 'app-explore-section',
  standalone: true,
  imports: [CommonModule, MediaSlideComponent, TmdbImagePipe, MediaTitlePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @defer (on viewport) {
      <div class="explore-section">
        <div class="explore-section-title">{{ title }}</div>
        <swiper-container
          class="explore-section-items"
          free-mode="true"
          momentum="false"
          slides-per-view="auto"
          space-between="10"
        >
          @for (item of items$ | async; track item.id) {
            <swiper-slide class="explore-section-items-single">
              <app-media-slide
                (click)="handleInfo(item)"
                [backdrop]="item.backdrop_path | tmdbImage: 'w500'"
                [logo]="item.logo_url | tmdbImage: 'original'"
                alt="{{ item | mediaTitle }}"
              ></app-media-slide>
            </swiper-slide>
          }
        </swiper-container>
      </div>
    } @placeholder (minimum 300ms) {
      <div class="explore-section">
        <div class="explore-section-title-placeholder placeholder">&nbsp;</div>
        <div class="explore-section-items-placeholder">
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
          <div class="explore-section-items-single-placeholder placeholder">
            &nbsp;
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './explore-section.component.scss',
})
export class ExploreSectionComponent implements OnInit {
  @Input() title!: string;
  @Input() mediaType!: string;
  @Input() listType!: string;
  @Input() period!: string;
  @Output() info = new EventEmitter<Media>();

  items$: Observable<Media[]> = new Observable();

  constructor(private tmdbService: TMDBService) {}

  ngOnInit() {
    this.items$ = this.tmdbService.getList(
      this.listType,
      this.mediaType,
      this?.period,
      true,
    );
  }
  singleService = inject(SingleService);

  onInfo(media: Media) {
    this.singleService.open(media);
  }
  handleInfo(media: Media) {
    this.info.emit(media);
  }
}
