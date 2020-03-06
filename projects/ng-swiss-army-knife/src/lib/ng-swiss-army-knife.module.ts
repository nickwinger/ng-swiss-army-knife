import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './pipes/roundNumber.pipe';
import { NgIonicSyncFormcontrolClassesDirective } from './directives/ng-ionic-sync-formcontrol-classes/ng-ionic-sync-formcontrol-classes.directive';

@NgModule({
  declarations: [RoundNumberPipe, NgIonicSyncFormcontrolClassesDirective],
  imports: [
  ],
  exports: [RoundNumberPipe, NgIonicSyncFormcontrolClassesDirective]
})
export class SwissArmyKnifeModule { }
