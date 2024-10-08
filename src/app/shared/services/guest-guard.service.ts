import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuestGuardService implements CanActivate {
  userService = inject(UserService);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    if (localStorage.getItem('accessKey')) {
      this.router.navigateByUrl('/browse');
      return of(false);
    } else {
      return of(true);
    }
  }
}
