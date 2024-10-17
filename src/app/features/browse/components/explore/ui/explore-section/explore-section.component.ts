import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  inject,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MediaSlideComponent } from '../../../../../../shared/components/media-poster.component';
import { TmdbImagePipe } from '../../../../../../shared/pipes/tmdb-image.pipe';
import { MediaTitlePipe } from '../../../../../../shared/pipes/media-title.pipe';
import { ExploreSectionPlaceholderComponent } from '../explore-section-placeholder/explore-section-placeholder.component';
import { Media } from '../../../../../../shared/models/media.model';
import { TMDBService } from '../../../../../../shared/services/tmdb.service';

@Component({
  selector: 'app-explore-section',
  standalone: true,
  imports: [
    CommonModule,
    MediaSlideComponent,
    TmdbImagePipe,
    MediaTitlePipe,
    ExploreSectionPlaceholderComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <section class="explore-section">
      <div class="explore-section-title">
        {{ title }}
      </div>

      @defer (on viewport) {
        <div class="explore-section-items">
          @if (items$ | async; as sectionItems) {
            @defer {
              <swiper-container
                class="swiper-container"
                free-mode="true"
                momentum="false"
                slides-per-view="auto"
              >
                @for (item of sectionItems; track item.id) {
                  <swiper-slide class="swiper-slide" #slide>
                    @defer (on viewport(slide)) {
                      <app-media-poster
                        alt="{{ item | mediaTitle }}"
                        [backdrop]="
                          item.backdrop_path || item.poster_path
                            | tmdbImage: 'w500'
                        "
                        [logo]="item.logo_url | tmdbImage: 'w300'"
                        (click)="handleInfo(item)"
                      ></app-media-poster>
                    } @placeholder {
                      <div></div>
                    }
                  </swiper-slide>
                }
              </swiper-container>
            }
          } @else {
            <app-explore-section-placeholder></app-explore-section-placeholder>
          }
        </div>
      } @placeholder {
        <div></div>
      }
    </section>
  `,
  styleUrl: './explore-section.component.scss',
})
export class ExploreSectionComponent implements OnInit {
  @Input() title!: string;
  @Input() listType!: string;
  @Input() mediaType!: string;
  @Input() period!: string;
  @Output() info = new EventEmitter<Media>();
  items$!: Observable<Media[]>;

  tmdbService = inject(TMDBService);

  ngOnInit() {
    this.tmdbService
      .getList(this.listType, this.mediaType, this?.period, true)
      .subscribe((items) => console.log(items, this.title));
    this.items$ = this.tmdbService.getList(
      this.listType,
      this.mediaType,
      this?.period,
      true,
    );
  }

  handleInfo(media: Media) {
    this.info.emit(media);
  }
}
