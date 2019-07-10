import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})

export class OutsideClickDirective {

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, target: HTMLElement): void {
    if (!target) {
      return;
    }

    const clickInside = this._elemRef.nativeElement.contains(target);
    if (!clickInside) {
      this.clickOutside.next(event);
    }
  }

  constructor(
    private _elemRef: ElementRef
  ) {
  }
}
