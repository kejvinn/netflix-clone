import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-media-poster',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="media">
      <img
        class="media-backdrop"
        decoding="async"
        src="{{ backdrop }}"
        [style.opacity]="loading ? '0' : '1'"
        (load)="onLoadEnd('backdrop')"
        (error)="onLoadEnd('backdrop')"
      />

      <img
        class="media-logo"
        decoding="async"
        src="{{ logo }}"
        alt="{{ alt }}"
        [style.opacity]="loading ? '0' : '1'"
        (load)="onLoadEnd('logo')"
        (error)="onLoadEnd('logo')"
      />

      @if (loading) {
        <div class="media-placeholder"></div>
      }
    </div>
  `,
  styles: `
    .media {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      aspect-ratio: 16 / 9;
      border-radius: inherit;
      overflow: hidden;

      &-backdrop {
        width: 100%;
        height: 100%;
        object-fit: cover;
        font-size: 2rem;
        display: block;
        z-index: 0;
        justify-content: center;
        align-items: center;
        background-color: #141414;
        border-radius: inherit;
        max-height: 100%;
      }

      &-logo {
        position: absolute;
        filter: drop-shadow(2px 2px 1px #000000);
        text-shadow:
          -1px -1px 0 rgba(0, 0, 0, 0.8),
          1px -1px 0 rgba(0, 0, 0, 0.8),
          -1px 1px 0 rgba(0, 0, 0, 0.8),
          1px 1px 0 rgba(0, 0, 0, 0.8);
        top: 50%;
        left: 50%;
        max-width: 50%;
        max-height: 50%;
        font-size: 1.5rem;
        transform: translate(-50%, -50%);
        z-index: 1;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;

        @media (max-width: 500px) {
          font-size: 0.8rem;
        }
      }
      &-placeholder {
        border-radius: inherit;
        position: absolute;
        width: 16rem;
        height: 9rem;
        animation-name: placeholder;
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
      }
    }
  `,
})
export class MediaSlideComponent {
  @Input() backdrop!: string;
  @Input() logo!: string;
  @Input() alt!: string;
  loading = true;

  private loadedImages = {
    backdrop: false,
    logo: false,
  };
  onLoadEnd(image: 'backdrop' | 'logo'): void {
    this.loadedImages[image] = true;

    if (this.loadedImages.backdrop && this.loadedImages.logo) {
      this.loading = false;
    }
  }
}
