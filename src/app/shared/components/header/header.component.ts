import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
	heroBell,
	heroMagnifyingGlass,
	heroXMark,
} from "@ng-icons/heroicons/outline";
import { UserMenuComponent } from "./ui/user-menu/user-menu.component";
import { SearchbarComponent } from "./ui/searchbar/searchbar.component";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		RouterModule,
		NgIconComponent,
		SearchbarComponent,
		UserMenuComponent,
	],
	providers: [provideIcons({ heroBell })],

	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss",
})
export class HeaderComponent {}
