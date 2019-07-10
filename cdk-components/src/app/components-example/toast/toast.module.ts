import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { ToastComponent } from './toast.component';
import { CommonModule } from '@angular/common';
import {
  defaultToastConfig,
  TOAST_CONFIG_TOKEN
} from './toast.config';
import { SafePipeModule } from '../../pipes/safe-pipe/safe-pipe.module';

@NgModule({
  declarations   : [ToastComponent],
  imports        : [
    CommonModule,
    SafePipeModule
  ],
  entryComponents: [ToastComponent]
})

export class ToastModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule : ToastModule,
      providers: [{
        provide : TOAST_CONFIG_TOKEN,
        useValue: defaultToastConfig
      }]
    };
  }
}
