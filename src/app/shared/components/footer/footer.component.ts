import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
	featherFacebook,
	featherInstagram,
	featherYoutube,
} from "@ng-icons/feather-icons";

@Component({
	selector: "app-footer",
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
				<a href="#">Audio Description</a>
				<a href="#">Help Centre</a>
				<a href="#">Gift Cards</a>
				<a href="#">Media Centre</a>
				<a href="#">Investor Relations</a>
				<a href="#">Jobs</a>
				<a href="#">Terms of Use</a>
				<a href="#">Privacy</a>
				<a href="#">Legal Notices</a>
				<a href="#">Cookie Preferences</a>
				<a href="#">Corporate Information</a>
				<a href="#">Contact Us</a>
			</div>
			<a class="footer-service_code" href="#">Service Code</a>
			<p class="footer-signature">© 1997-2024 Netflix, Inc.</p>
		</div>
	`,
	styleUrl: "./footer.component.scss",
})
export class FooterComponent {}
