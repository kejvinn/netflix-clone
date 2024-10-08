import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlass, heroXMark } from '@ng-icons/heroicons/outline';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SearchService } from '../../../../../features/search/services/search.service';

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
          width: 'auto',
          border: '1px solid #fff',
          padding: '0.2rem 0.2rem',
        }),
      ),
      state('closedLabel', style({ width: 'auto', border: 'none' })),
      state('openedInput', style({ width: 'auto' })),
      state('closedInput', style({ width: '0' })),
      // transition('openedLabel <=> closedLabel', animate('0.5s ease')),
      // transition('openedInput <=> closedInput', animate('0.5s ease')),
    ]),
  ],
  template: `
    <div class="search">
      <label
        class="search-label"
        [@search]="searching ? 'openedLabel' : 'closedLabel'"
        #searchLabel
      >
        <ng-icon
          class="search-icon"
          name="heroMagnifyingGlass"
          (click)="toggleSearch()"
        ></ng-icon>
        <input
          class="search-input"
          type="text"
          [@search]="searching ? 'openedInput' : 'closedInput'"
          (keyup.enter)="triggerSearch()"
          #searchInput
        />
        @if (searching === true) {
          <ng-icon
            name="heroXMark"
            class="search-icon"
            (click)="closeSearch()"
          ></ng-icon>
        }
      </label>
    </div>
  `,
  styles: `
    $medium: 700px;
    .search {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      position: relative;
      grid-column: 3;
      &-label {
        width: auto;
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
        ng-icon {
          height: 1.5rem;
          width: 1.5rem;
          @media screen and (max-width: var(--medium)) {
            height: 1rem;
            width: 1rem;
          }
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

  searching: boolean = false;

  searchService = inject(SearchService);

  constructor(
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.triggerSearch();
        this.router.navigateByUrl('/search');
      });
  }
  ngOnDestroy(): void {
    this.closeSearch();
  }

  triggerSearch() {
    this.searchService.search(this.searchInput.nativeElement.value);
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.searchInput.nativeElement.focus();
    this.triggerSearch();
  }
  closeSearch() {
    this.searching = false;
    this.location.back();
  }

  toggleSearch() {
    this.searching = true;
    this.router.navigateByUrl('/search');
  }
}
