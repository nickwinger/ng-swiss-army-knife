import { PubSubService } from './pub-sub.service';
import { TemplateService } from './template.service';
import { CachedObservableService } from './cachedObservable.service';

export class Services {
  static PubSubService = PubSubService;
  static TemplateService = TemplateService;
  static CachedObservableService = CachedObservableService;
}
