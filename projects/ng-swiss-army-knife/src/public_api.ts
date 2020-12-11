/*
 * Public API Surface of ng-swiss-army-knife
 */

import { Helper } from './lib/helper';
import { Services } from './lib/services';
import { BaseComponent } from './lib/classes/base.component';
import { FormValidators } from './lib/validators';

export * from './lib/services/template.service';
export * from './lib/ng-swiss-army-knife.module';
export * from './lib/services/pub-sub.service';
export * from './lib/services/key-value-store.service';
export * from './lib/services/cachedObservable.service';
export * from './lib/helper';
export * from './lib/helper/file';
export * from './lib/helper/form';
export * from './lib/helper/comparator';
export * from './lib/helper/misc';
export * from './lib/helper/string';
export * from './lib/helper/array';
export * from './lib/classes/base.component';
export * from './lib/classes/stateFulObject';
export * from './lib/classes/cachedObservable';
export * from './lib/helper/date';
export * from './lib/helper/object';
export * from './lib/validators';
export * from './lib/directives/ng-ionic-sync-formcontrol-classes/ng-ionic-sync-formcontrol-classes.directive';
export * from './lib/directives/shadowDomStyle.directive';
export * from './lib/pipes/roundNumber.pipe';

export class SwissArmyKnife {
  static FormValidators = FormValidators;
  static Helper = Helper;
  static Services = Services;
  static BaseComponent = BaseComponent;
}
