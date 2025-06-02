import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBell } from '@ng-icons/heroicons/outline';
import { SearchbarComponent } from './components/searchbar.component';
import { UserMenuComponent } from './components/user-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NgIconComponent,
    SearchbarComponent,
    UserMenuComponent,
  ],
  providers: [provideIcons({ heroBell })],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
