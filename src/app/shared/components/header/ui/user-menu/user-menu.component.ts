import { Component, inject } from "@angular/core";

import { MatMenuModule } from "@angular/material/menu";
import { AuthService } from "../../../../services/auth.service";

@Component({
	selector: "app-user-menu",
	standalone: true,
	imports: [MatMenuModule],
	template: `
		<button class="menu-btn" mat-icon-button [matMenuTriggerFor]="menu">
			<img src="assets/img/profile.png" alt="profile" />
		</button>
		<mat-menu class="menu" [overlapTrigger]="false" #menu="matMenu">
			<button (click)="logout()" class="menu-item" mat-menu-item>Logout</button>
		</mat-menu>
	`,
	styles: `
		.menu-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			background: none;
			border: none;
			cursor: pointer;
			img {
				height: 1.5rem;
			}
		}
		.menu {
			background-color: #000;
		}
	`,
})
export class UserMenuComponent {
	authService = inject(AuthService);

	logout() {
		this.authService.logout();
	}
}
