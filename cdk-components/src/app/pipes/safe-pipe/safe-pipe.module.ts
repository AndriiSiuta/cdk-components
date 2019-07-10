import { NgModule } from '@angular/core';
import { SafePipe } from '@shared/safe-pipe/safe.pipe';

@NgModule({
  declarations: [SafePipe],
  exports: [SafePipe]
})

export class SafePipeModule {}
