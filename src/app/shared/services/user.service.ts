import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { tap, of, map, Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class UserService {
	private users: User[] = [];

	constructor(private http: HttpClient) {}

	getAll() {
		if (this.users.length !== 0) {
			return of(this.users);
		}

		return this.http.get<User[]>("/api/users").pipe(
			tap((users) => {
				this.users = users;
			}),
		);
	}
	getFromLogin(email: string, password: string): Observable<User | null> {
		return this.getAll().pipe(
			map((users) => {
				const user = users.find(
					(user: User) => user.email === email && user.password === password,
				);
				if (user) {
					return user;
				}
				return null;
			}),
		);
	}

	getFromAccessKey(accessKey: string): Observable<User | null> {
		return this.getAll().pipe(
			map((users) => {
				const user = users.find((user: User) => user.accessKey === accessKey);
				if (user) {
					return user;
				}
				return null;
			}),
		);
	}
}
