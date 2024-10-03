import { Component, inject } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroHandThumbUp,
  heroPlus,
  heroXMark,
} from '@ng-icons/heroicons/outline';
import { Media } from '../../models/media.model';
import { Observable } from 'rxjs';
import { SingleService } from '../../services/single.service';
import { heroPlaySolid } from '@ng-icons/heroicons/solid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [
    provideIcons({ heroXMark, heroPlaySolid, heroPlus, heroHandThumbUp }),
  ],
  templateUrl: './single.component.html',
  styleUrl: './single.component.scss',
})
export class SingleComponent {
  Media: Observable<Media> = new Observable<Media>();

  singleService = inject(SingleService);
}
