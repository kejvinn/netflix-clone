import { Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { ReleaseDateFormatPipe } from '../../../../pipes/release-date-format.pipe';
import { NumberOfSeasonsFormatPipe } from '../../../../pipes/number-of-seasons-format.pipe';
import { RuntimeFormatPipe } from '../../../../pipes/runtime-format.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ReleaseDateFormatPipe,
    NumberOfSeasonsFormatPipe,
    RuntimeFormatPipe,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  @Input() releaseDate!: string;
  @Input() runtime!: string;
  @Input() rating!: string;
  @Input() overview!: string | undefined;
  @Input() cast!: string | undefined;
  @Input() genres!: string | undefined;
}
