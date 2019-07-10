import { Overlay } from '@angular/cdk/overlay';
import {
  ComponentPortal,
  PortalInjector
} from '@angular/cdk/portal';
import {
  Inject,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastRef } from './toast-ref';
import { ToastComponent } from './toast.component';
import {
  TOAST_CONFIG_TOKEN,
  ToastConfig,
  ToastData
} from './toast.config';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private lastToast: ToastRef;

  show(data: ToastData) {
    // generate position
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    // toast controller
    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    // create portal
    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getPositionStrategy() {
    return this.overlay.position()
      .global()
      .centerHorizontally()
      .top(this.getPosition());
  }

  getPosition() {
    const lastToastVisible = this.lastToast && this.lastToast.isVisible();
    // const position = lastToastVisible
    //   ? this.lastToast.getPosition().top - this.lastToast.getPosition().height
    //   : this.toastConfig.position.bottom;


    const position = lastToastVisible
      ? this.lastToast.getPosition().bottom
      : this.toastConfig.position.top;
    return `${position}px`;
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Inject(TOAST_CONFIG_TOKEN) private toastConfig: ToastConfig
  ) {
  }
}
