import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { SingleComponent } from '../../shared/components/single/single.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, SingleComponent, RouterOutlet],
  template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
      @defer {
        <app-footer></app-footer>
      } @placeholder {
        <div></div>
      }
      <app-single></app-single>
  `,
  styles: `
  
    app-header {
      z-index: 3;
    }

    app-footer {
      margin-top: 5rem;
    }
  `
})
export class MainLayoutComponent {
  authService = inject(AuthService);
}
