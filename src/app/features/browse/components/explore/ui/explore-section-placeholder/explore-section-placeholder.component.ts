import { Component } from '@angular/core';

@Component({
  selector: 'app-explore-section-placeholder',
  standalone: true,
  imports: [],
  template: `
    <section class="placeholder" #thisSection>
      <div class="placeholder-items">
        @for (i of [].constructor(placeholderAmount); track $index) {
          <div class="item"></div>
        }
      </div>
    </section>
  `,
  styleUrl: './explore-section-placeholder.component.scss',
})
export class ExploreSectionPlaceholderComponent {
  placeholderAmount = Math.ceil(window.innerWidth / 256) + 1;
}
