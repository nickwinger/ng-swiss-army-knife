import { NgModule } from '@angular/core';
import { RoundNumberPipe } from './pipes/roundNumber.pipe';
import { NgIonicSyncFormcontrolClassesDirective } from './directives/ng-ionic-sync-formcontrol-classes/ng-ionic-sync-formcontrol-classes.directive';
import { ShadowDomStyleDirective } from './directives/shadowDomStyle.directive';

@NgModule({
  declarations: [RoundNumberPipe, NgIonicSyncFormcontrolClassesDirective, ShadowDomStyleDirective],
  imports: [
  ],
  exports: [RoundNumberPipe, NgIonicSyncFormcontrolClassesDirective, ShadowDomStyleDirective]
})
export class SwissArmyKnifeModule { }
