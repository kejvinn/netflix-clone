import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  featherFacebook,
  featherInstagram,
  featherYoutube,
} from '@ng-icons/feather-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIconComponent],
  providers: [
    provideIcons({ featherFacebook, featherInstagram, featherYoutube }),
  ],
  template: `
    <div class="footer">
      <div class="footer-socials">
        <a href="#">
          <ng-icon name="featherFacebook"></ng-icon>
        </a>
        <a href="#">
          <ng-icon name="featherInstagram"></ng-icon>
        </a>
        <a href="#">
          <ng-icon name="featherYoutube"></ng-icon>
        </a>
      </div>
      <div class="footer-nav">
        <div>
          <a href="#">Audio Description</a>
        </div>
        <div>
          <a href="#">Help Centre</a>
        </div>
        <div>
          <a href="#">Gift Cards</a>
        </div>
        <div>
          <a href="#">Media Centre</a>
        </div>
        <div>
          <a href="#">Investor Relations</a>
        </div>
        <div>
          <a href="#">Jobs</a>
        </div>
        <div>
          <a href="#">Terms of Use</a>
        </div>
        <div>
          <a href="#">Privacy</a>
        </div>
        <div>
          <a href="#">Legal Notices</a>
        </div>
        <div>
          <a href="#">Cookie Preferences</a>
        </div>
        <div>
          <a href="#">Corporate Information</a>
        </div>
        <div>
          <a href="#">Contact Us</a>
        </div>
      </div>
      <a class="footer-service_code" href="#">Service Code</a>
      <p class="footer-signature">© 1997-2024 Netflix, Inc.</p>
    </div>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
