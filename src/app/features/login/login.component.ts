import { Component, inject } from '@angular/core';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, FormsModule],
  template: `
    <div class="login">
      <div class="login-background_image">
        <img src="assets/img/login-backgroud.jpg" alt="background-image" />
      </div>
      <header class="login-header">
        <div class="login-header-logo">
          <img
            class="login-header-logo-img"
            src="assets/img/logo.png"
            alt="logo"
          />
        </div>
      </header>
      <main class="login-main">
        <login-form (login)="onLogin($event)"></login-form>
      </main>
      <footer class="login-footer">
        <div class="nav">
          <a class="nav-contact" href="#">Questions? Contact us.</a>
          <a class="nav-item" href="#">FAQ</a>
          <a class="nav-item" href="#">Help Center</a>
          <a class="nav-item" href="#">Terms of Use</a>
          <a class="nav-item" href="#">Privacy</a>
          <a class="nav-item" href="#">Cookie Preference</a>
          <a class="nav-item" href="#">Corporate Information</a>
        </div>
      </footer>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  currentUserService = inject(CurrentUserService);
  router = inject(Router);

  onLogin(form: { email: string; password: string }) {
    this.authService.login(form);
    this.currentUserService.setCurrentUser();
    this.router.navigateByUrl('/browse');
  }
}
