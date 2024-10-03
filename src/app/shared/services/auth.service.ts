import { inject, Injectable, signal } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	currentUser = signal<User | null>(null);
	userService = inject(UserService);
	router = inject(Router);

	login(form: { email: string; password: string }) {
		this.userService
			.getFromLogin(form.email, form.password)
			.subscribe((user: User | null) => {
				if (user) {
					this.currentUser.set(user);
					localStorage.setItem(
						"accessKey",
						this.currentUser()?.accessKey || "",
					);
				}
			});
	}

	logout() {
		this.currentUser.set(null);
		localStorage.removeItem("accessKey");
		this.router.navigate(["/login"]);
	}

	getCurrentUser(): User | null {
		if (this.currentUser() === null) {
			this.userService
				.getFromAccessKey(localStorage.getItem("accessKey") || "")
				.subscribe((user: User | null) => {
					this.currentUser.set(user);
				});
		}

		return this.currentUser();
	}
}
