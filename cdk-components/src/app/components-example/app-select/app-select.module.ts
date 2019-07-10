import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSelectComponent } from './app-select.component';
import { OutsideClickModule } from '../tooltip/directives/outside-click.module';

@NgModule({
  declarations: [AppSelectComponent],
  imports     : [
    CommonModule,
    ScrollingModule,
    OutsideClickModule,
    ReactiveFormsModule
  ],
  exports     : [AppSelectComponent]
})

export class AppSelectModule {
}
