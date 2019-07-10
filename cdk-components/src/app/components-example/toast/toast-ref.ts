import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {

  close() {
    this.overlayRef.dispose();
  }

  isVisible() {
    return this.overlayRef && this.overlayRef.overlayElement;
  }

  getPosition() {
    return this.overlayRef.overlayElement.getBoundingClientRect();
  }

  constructor(readonly overlayRef: OverlayRef) {
  }
}
