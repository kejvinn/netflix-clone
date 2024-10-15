import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentUserService } from './shared/services/current-user.service';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './shared/services/auth.service';
import { SingleComponent } from './shared/components/single/single.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SingleComponent],
  template: `
    @if (authService.getCurrentUser() !== null) {
      <app-header></app-header>
      <router-outlet></router-outlet>
      @defer {
        <app-footer></app-footer>
      } @placeholder {
        <div></div>
      }
      <app-single></app-single>
    } @else {
      <router-outlet></router-outlet>
    }
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
  authService = inject(AuthService);
  constructor(private currentUserService: CurrentUserService) {}
  // ngOnInit() {
  // this.currentUserService.setCurrentUser();
  // }
}
