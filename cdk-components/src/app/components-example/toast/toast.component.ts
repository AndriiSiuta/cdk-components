import { AnimationEvent } from '@angular/animations';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ToastRef } from './toast-ref';
import {
  toastAnimations,
  ToastAnimationState
} from './toast-animation';
import {
  TOAST_CONFIG_TOKEN,
  ToastConfig,
  ToastData
} from './toast.config';

@Component({
  selector   : 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls  : ['./toast.component.scss'],
  animations : [toastAnimations.fadeToast]
})

export class ToastComponent implements OnInit, OnDestroy {
  iconUrl = '/assets/toast/toast-';
  animationState: ToastAnimationState = 'default';
  toastState = 'success';

  private intervalId: number;

  ngOnInit(): void {
    this.iconUrl += `${this.data.type}.svg`;
    this.toastState = this.data.type;

    this.intervalId = setTimeout(() => this.animationState = 'closing', 2500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervalId);
  }

  onFadeFinished(event: AnimationEvent) {
    const { toState } = event;

    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const itFinished = this.animationState === 'closing';

    if (isFadeOut && itFinished) {
      this.close();
    }
  }

  close() {
    this.ref.close();
  }

  constructor(
    readonly data: ToastData,
    readonly ref: ToastRef,
    @Inject(TOAST_CONFIG_TOKEN) public toastConfig: ToastConfig
  ) {
  }
}
