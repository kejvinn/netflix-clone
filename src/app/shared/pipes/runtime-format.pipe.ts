import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runtimeFormat',
  standalone: true,
})
export class RuntimeFormatPipe implements PipeTransform {
  transform(minutes: number | undefined): string {
    if (minutes == undefined) return '';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }
}
