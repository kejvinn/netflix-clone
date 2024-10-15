import { MediaTitlePipe } from '../../../pipes/media-title.pipe';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CastMember } from '../../../models/cast-member.model';
import { Genre } from '../../../models/genre.model';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, MediaTitlePipe],
  template: `
    <div class="credits">
      <div class="credits-title">About {{ title }}</div>
      <p class="cast">
        <span style="color: #555">Cast:</span>
        <span>
          @for (member of cast | slice: 0 : 10; track member.id) {
            {{ member.name }},
          }
        </span>
        <span style="font-style: italic">more</span>
      </p>
      <p class="genres">
        <span style="color: #555">Genres:</span>
        <span>
          @for (genre of genres; let last = $last; track genre.id) {
            {{ genre.name + (last ? '.' : ', ') }}
          }
        </span>
      </p>
    </div>
  `,
  styles: `
    .credits {
      padding: 0 3rem 3rem;
      @media screen and (max-width: 500px) {
        padding: 0 1rem 1rem;
      }
      &-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        @media screen and (max-width: 500px) {
          font-size: 1.2rem;
        }
      }
      .cast,
      .genres {
        margin-bottom: 0.5rem;
        @media screen and (max-width: 500px) {
          span {
            font-size: 0.8rem;
          }
        }
      }
    }
  `,
})
export class CreditsComponent {
  @Input() title!: string;
  @Input() cast!: CastMember[] | undefined;
  @Input() genres!: Genre[] | undefined;
}
