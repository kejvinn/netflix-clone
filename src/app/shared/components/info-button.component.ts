import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroInformationCircle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-info-button',
  standalone: true,
  imports: [NgIconComponent],
  providers: [
    provideIcons({
      heroInformationCircle,
    }),
  ],
  template: `
    <button class="btn button info">
      <ng-icon name="heroInformationCircle"></ng-icon>
      More Info
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
      color: #fff;
      background-color: #4f4f50;

      @media (max-width: 900px) {
        font-size: 1rem;
        height: 2.5rem;
        padding: 0rem 1rem;
      }

      @media (max-width: 500px) {
        font-size: 0.8rem;
        height: 1.5rem;
        padding: 0rem 1rem;
      }

      ng-icon {
        height: 2.2rem;
        width: 2.2rem;
        margin-right: 0.3rem;

        @media (max-width: 900px) {
          height: 1rem;
          width: 1rem;
        }

        @media (max-width: 500px) {
          height: 1rem;
          width: 1rem;
        }
      }
    }
  `,
})
export class InfoButtonComponent {}
