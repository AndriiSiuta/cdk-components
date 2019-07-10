import {
  InjectionToken,
  TemplateRef
} from '@angular/core';
import { ToastType } from '@shared/toast/toast.service';

export class ToastData {
  message: string;
  type: ToastType;
  template?: TemplateRef<any>;
  templateContext?: {};
}

export interface ToastConfig {
  position?: {
    top?: number,
    bottom?: number;
    right: number;
  };
  animation?: {
    fadeOut: number;
    fadeIn: number;
  };
}

// export const defaultToastConfig: ToastConfig = {
//   position : {
//     bottom: 30,
//     right : 30
//   },
//   animation: {
//     fadeOut: 2500,
//     fadeIn : 300
//   }
// };

export const defaultToastConfig: ToastConfig = {
  position : {
    top: 50,
    right : 30
  },
  animation: {
    fadeOut: 2500,
    fadeIn : 300
  }
};

export const TOAST_CONFIG_TOKEN = new InjectionToken('toast-config');
