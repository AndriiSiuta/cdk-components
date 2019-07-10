import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  ConnectedPosition,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AppTooltipComponent } from '../app-tooltip.component';

@Directive({ selector: '[appTooltip]' })
export class AppTooltipDirective implements OnInit {
  @Input() tooltipTitle = '';
  @Input() connectedPosition: ConnectedPosition[] = [{
    originX : 'center',
    originY : 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY : 7
  }];
  private overlayRef: OverlayRef;

  ngOnInit(): void {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions(this.connectedPosition);
    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  @HostListener('mouseenter')
  show() {
    const compPortal = new ComponentPortal(AppTooltipComponent);
    const tooltipRef = this.overlayRef.attach(compPortal);

    tooltipRef.instance.title = this.tooltipTitle;
    return tooltipRef;
  }

  @HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private elementRef: ElementRef
  ) {
  }
}

