import {
	Directive,
	Output,
	EventEmitter,
	ElementRef,
	HostListener,
} from "@angular/core";

@Directive({
	selector: "[clickAway]",
	standalone: true,
})
export class ClickAwayDirective {
	@Output() clickAway = new EventEmitter<void>();

	constructor(private elementRef: ElementRef) {}

	@HostListener("document:click", ["$event.target"])
	public onClick(target: HTMLElement): void {
		const clickedInside = this.elementRef.nativeElement.contains(target);
		if (!clickedInside) {
			this.clickAway.emit();
		}
	}
}
