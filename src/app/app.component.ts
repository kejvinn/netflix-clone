import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
      <router-outlet></router-outlet>
  `,
  styles: `
    app-header {
      z-index: 3;
    }

    app-footer {
      margin-top: 5rem;
    }
  `,
})
export class AppComponent {
}
