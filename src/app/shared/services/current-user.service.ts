import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  authService = inject(AuthService);

  currentUser$ = new BehaviorSubject<
    { id: string; username: string } | null | undefined
  >(undefined);

  setCurrentUser() {
    if (localStorage.getItem('accessKey')) {
      this.currentUser$.next(this.authService.getCurrentUser());
    } else {
      this.currentUser$.next(undefined);
    }
  }
}
