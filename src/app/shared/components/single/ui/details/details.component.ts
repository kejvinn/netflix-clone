import { Component, Input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';
import { ReleaseDateFormatPipe } from '../../../../pipes/release-date-format.pipe';
import { NumberOfSeasonsFormatPipe } from '../../../../pipes/number-of-seasons-format.pipe';
import { RuntimeFormatPipe } from '../../../../pipes/runtime-format.pipe';
import { CommonModule } from '@angular/common';
import { CastMember } from '../../../../models/cast-member.model';
import { Genre } from '../../../../models/genre.model';

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
  @Input() seasonsCount!: string;
  @Input() runtime!: string;
  @Input() rating!: string;
  @Input() overview!: string | undefined;
  @Input() cast!: CastMember[] | undefined;
  @Input() genres!: Genre[] | undefined;
}
