import { Component } from '@angular/core';
import { FeaturedComponent } from './components/featured/featured.component';
import { RouterOutlet } from '@angular/router';
import { ExploreComponent } from './components/explore/explore.component';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FeaturedComponent, ExploreComponent, RouterOutlet],
  template: ` <div class="browse">
    <app-featured></app-featured>
    <app-explore></app-explore>
  </div>`,
  styles: `
    app-featured {
      background-color: #000;
      position: relative;
      z-index: 2;
      @media screen and (max-width: var(--medium)) {
        padding-top: 3.5rem;
      }
    }
    app-explore {
      position: relative;
      z-index: 3;
    }
  `,
})
export class BrowseComponent {}
