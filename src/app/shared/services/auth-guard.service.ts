import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  userService = inject(UserService);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.userService
      .getFromAccessKey(localStorage.getItem('accessKey') || '')
      .pipe(
        map((user) => {
          if (user === null) {
            this.router.navigateByUrl('/login');
            return false;
          }
          return true;
        }),
      );
    // return this.currentUserService.currentUser$.pipe(
    // 	filter((currentUser) => currentUser !== undefined),
    // 	map((currentUser) => {
    // 		if (!currentUser) {
    // 			this.router.navigateByUrl("/login");
    // 			return false;
    // 		}
    // 		return true;
    // 	}),
    // );
  }
}
