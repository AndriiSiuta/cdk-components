import {
  ConnectedPosition,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ElementRef,
  Injectable,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';


export interface DropdownParams<T> {
  containerRef: ViewContainerRef;
  template: TemplateRef<any>;
  position?: ConnectedPosition[];
  isModal?: boolean;
  hasBackdrop?: boolean;
  overlayConfig?: OverlayConfig;
}

@Injectable({ providedIn: 'root' })
export class DropdownService {
  private customPosition: ConnectedPosition[];

  /**
   *
   * @param params { DropdownParams<T> }
   * @return overlay { OverlayRef }
   */
  open<T>(params: DropdownParams<T>): OverlayRef {
    this.initPosition(params.position);
    const tmpPortal = new TemplatePortal(params.template, params.containerRef);

    let overlayRef;

    if (params.isModal) {
      overlayRef = this.overlay.create(this.getOverlayConfigModal());
    } else {
      overlayRef = this.overlay.create(this.getOverlayConfig(
        params.template.elementRef,
        params.hasBackdrop,
        params.overlayConfig || {}));
    }

    overlayRef.attach(tmpPortal);

    overlayRef.backdropClick().subscribe(() => overlayRef.dispose());
    return overlayRef;
  }

  /**
   *
   * @param elementRef {ElementRef}
   * @param hasBackDrop {Boolean}
   * @param additionalSettings {OverlayConfig}
   */
  private getOverlayConfig(elementRef: ElementRef, hasBackDrop = false, additionalSettings = {}): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop     : hasBackDrop,
      backdropClass   : 'overlay-backdrop',
      positionStrategy: this.getOverlayPosition(elementRef),
      scrollStrategy  : this.overlay.scrollStrategies.reposition(),
      ...additionalSettings
    });
  }

  /**
   * Gets overlay config for modals
   */
  private getOverlayConfigModal(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop     : true,
      backdropClass   : 'modal-backdrop',
      scrollStrategy  : this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  /**
   * Gets overlay config for attached ElementRef
   * @param elementRef
   */
  private getOverlayPosition(elementRef: ElementRef): PositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(elementRef.nativeElement.parentElement)
      .withPositions(this.customPosition)
      .withPush(false);
  }

  /**
   * Setup cdk connected position to ElementRef
   * @param position
   */
  // ToDo [Andrii] change logic here to custom only
  private initPosition(position: ConnectedPosition[] = null): ConnectedPosition[] {
    if (position) {
      this.customPosition = position;
    } else {
      this.customPosition = [{
        originX : 'end',
        originY : 'top',
        overlayX: 'start',
        overlayY: 'center',
        offsetY : -50,
        offsetX : 15
      }];
    }

    return this.customPosition;
  }

  constructor(
    private overlay: Overlay,
  ) {
  }
}
