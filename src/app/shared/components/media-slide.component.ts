import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-media-slide',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="slide">
      <img
        class="slide-poster"
        loading="lazy"
        decoding="async"
        src="{{ backdrop }}"
      />
      <img
        class="slide-logo"
        loading="lazy"
        decoding="async"
        src="{{ logo }}"
      />
      <div
        class=" slide-preloader swiper-lazy-preloader swiper-lazy-preloader-white"
      ></div>
    </div>
  `,
  styles: `
    .slide {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0.4rem;
      width: 16rem;
      height: 12rem;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      @media screen and (max-width: var(--medium)) {
        width: 14rem;
        height: 8rem;
      }

      @media screen and (max-width: var(--small)) {
        width: 8rem;
        height: 5rem;
      }

      &-poster {
        width: 16rem;
        height: 10rem;
        border-radius: 0.3rem;
        object-fit: cover;
        font-size: 2rem;
        display: block;
        z-index: 0;
        justify-content: center;
        align-items: center;
        background-color: #141414;

        @media screen and (max-width: var(--medium)) {
          width: 14rem;
          height: 8rem;
        }

        @media screen and (max-width: var(--small)) {
          width: 8rem;
          height: 5rem;
        }
      }

      &-logo {
        position: absolute;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
        top: 50%;
        left: 50%;
        max-width: 50%;
        max-height: 50%;
        font-size: 1.5rem;
        color: invert(1);
        transform: translate(-50%, -50%);
        z-index: 1;

        @media screen and (max-width: var(--small)) {
          font-size: 0.8rem;
        }
      }
      &-preloader {
        z-index: 1;
      }
      &:hover {
        transform: scale(1.05);
      }
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MediaSlideComponent {
  @Input() backdrop!: string;
  @Input() logo!: string;
  @Input() alt!: string;
}
