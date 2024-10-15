import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { GuestGuardService } from './shared/services/guest-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuardService],
  },

  {
    path: 'browse',
    loadComponent: () =>
      import('./features/browse/browse.component').then(
        (m) => m.BrowseComponent,
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./features/search/search.component').then(
        (m) => m.SearchComponent,
      ),
    canActivate: [AuthGuardService],
  },

  { path: '**', redirectTo: 'login' },
];
