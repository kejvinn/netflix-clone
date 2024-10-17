import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass, heroXMark } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchService } from '../../../../features/search/services/search.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [provideIcons({ heroMagnifyingGlass, heroXMark })],
  animations: [
    trigger('search', [
      state(
        'openedLabel',
        style({
          border: '1px solid #fff',
        }),
      ),
      state('closedLabel', style({ border: 'none' })),
      state('openedInput', style({ width: '*' })),
      state('closedInput', style({ width: '0' })),
      transition('openedInput <=> closedInput', [animate('0.3s ease-in-out')]),
    ]),
  ],
  template: `
    <div class="search">
      <div
        class="search-container"
        [@search]="searchService.searching() ? 'openedLabel' : 'closedLabel'"
        #searchLabel
      >
        <ng-icon
          class="search-icon"
          name="heroMagnifyingGlass"
          (click)="openSearch()"
        ></ng-icon>
        <input
          class="search-input"
          type="text"
          [@search]="searchService.searching() ? 'openedInput' : 'closedInput'"
          (keyup.enter)="triggerSearch()"
          #searchInput
        />
        @if (searchService.searching() === true) {
          <ng-icon
            name="heroXMark"
            class="search-icon"
            (click)="closeSearch()"
          ></ng-icon>
        }
      </div>
    </div>
  `,
  styles: `
    .search {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      position: relative;
      grid-column: 3;
      &-container {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        padding: 0.2rem 0.2rem;
        ng-icon {
          height: 1.5rem;
          width: 1.5rem;
        }
      }
      &-input {
        color: #fff;
        background: transparent !important;
        border: none;
        &:focus {
          outline: none;
        }
      }
      &-icon {
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }
    }
  `,
})
export class SearchbarComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  searchService = inject(SearchService);
  router = inject(Router);
  location = inject(Location);

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.triggerSearch();
        this.router.navigateByUrl('/search');
      });
  }

  triggerSearch() {
    this.searchService.search(this.searchInput.nativeElement.value);
  }

  closeSearch() {
    this.searchService.searching.set(false);
    this.searchInput.nativeElement.value = '';
    this.searchService.stopSearch();
    this.location.back();
    this.searchInput.nativeElement.blur();
  }

  openSearch() {
    this.searchService.searching.set(true);
    this.searchInput.nativeElement.focus();
    this.router.navigateByUrl('/search');
  }
}
