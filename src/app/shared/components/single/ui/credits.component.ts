import { MediaTitlePipe } from '../../../pipes/media-title.pipe';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, MediaTitlePipe],
  template: `
    <div class="credits">
      <div class="credits-title">About {{ title }}</div>
      @if (cast) {
        <p class="cast">
          <span style="color: #555">Cast:</span>
          <span>
            {{ cast }}
          </span>
        </p>
      }
      @if (genres) {
        <p class="genres">
          <span style="color: #555">Genres:</span>
          <span>
            {{ genres }}
          </span>
        </p>
      }
    </div>
  `,
  styles: `
    .credits {
      padding: 0 3rem 3rem;
      @media (max-width: 500px) {
        padding: 0 1rem 1rem;
      }
      &-title {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
        @media (max-width: 500px) {
          font-size: 1.2rem;
        }
      }
      .cast,
      .genres {
        margin-bottom: 0.5rem;
        @media (max-width: 500px) {
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
  @Input() cast!: string | undefined;
  @Input() genres!: string | undefined;
}
