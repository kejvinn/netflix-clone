import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService
    .getFromAccessKey(localStorage.getItem('accessKey') || '')
    .pipe(
      map((user) => {
        if (user === null) {
          router.navigateByUrl('/login');
          return false;
        }
        return true;
      }),
    );
}

