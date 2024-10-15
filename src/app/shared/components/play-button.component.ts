import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-play-button',
  standalone: true,
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      heroPlaySolid,
    }),
  ],
  template: `
    <button class="btn button">
      <ng-icon name="heroPlaySolid"></ng-icon>
      Play
    </button>
  `,
  styles: `
    .button {
      z-index: 4;
      display: flex;
      border: none;
      align-items: center;
      justify-content: center;
      height: 4rem;
      padding: 0 2rem;
      font-weight: bold;
      cursor: pointer;
      font-size: 1.5rem;
      border-radius: 0.3rem;

      @media screen and (max-width: 900px) {
        font-size: 1rem;
        height: 2.5rem;
        padding: 0rem 1rem;
      }

      @media screen and (max-width: 500px) {
        font-size: 0.8rem;
        height: 1.5rem;
        padding: 0rem 1rem;
      }

      ng-icon {
        height: 2.2rem;
        width: 2.2rem;
        margin-right: 0.3rem;

        @media screen and (max-width: 900px) {
          height: 1rem;
          width: 1rem;
        }

        @media screen and (max-width: 500px) {
          height: 1rem;
          width: 1rem;
        }
      }
    }
  `,
})
export class PlayButtonComponent {}
