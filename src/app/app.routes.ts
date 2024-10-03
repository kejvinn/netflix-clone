import { Routes } from "@angular/router";
import { LoginComponent } from "./features/login/login.component";
import { AuthGuardService } from "./shared/services/auth-guard.service";

export const routes: Routes = [
	{
		path: "login",
		component: LoginComponent,
	},

	{
		path: "browse",
		loadComponent: () =>
			import("./features/browse/browse.component").then(
				(m) => m.BrowseComponent,
			),
		canActivate: [AuthGuardService],
	},
	{
		path: "search",
		loadComponent: () =>
			import("./features/search/search.component").then(
				(m) => m.SearchComponent,
			),
		canActivate: [AuthGuardService],
	},
	// {
	// 	path: "single",
	// 	loadComponent: () =>
	// 		import("./features/single/single.component").then(
	// 			(m) => m.SingleComponent,
	// 		),
	// 	canActivate: [AuthGuardService],
	// },

	{ path: "**", redirectTo: "login" },
];
