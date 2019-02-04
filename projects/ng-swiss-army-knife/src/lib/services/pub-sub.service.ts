import {map, filter} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

export interface PubSubData {
  topic: any;
  message: any;
}

@Injectable({
  providedIn: 'root'
})
/**
 * Simple PubSub Service for communication between components and/or browser
 * tabs
 */
export class PubSubService {
  private subject: Subject<PubSubData>;
  private static LOCALSTORAGE_KEY = '__crossTabCommunication';

  constructor() {
    this.subject = new Subject();

    window.addEventListener('storage', (event: StorageEvent) => {

      if (event.key !== PubSubService.LOCALSTORAGE_KEY)
        return;

      if (!event.newValue)
        return;

      const data: PubSubData = JSON.parse(event.newValue);
      this.publish(data.topic, data.message);
    });
  }

  /**
   * Publish across browser tabs
   * @param topic Name of the topic
   * @param message The message of the topic
   * @param includeSelf True if you want to publish also to the current
   * active tab (defaults to false)
   */
  publishCrossTab(topic: any, message?: any, includeSelf = false) {
    localStorage.setItem(PubSubService.LOCALSTORAGE_KEY, JSON.stringify({topic: topic, message: message}));

    if (includeSelf)
      this.publish(topic, message);
  }

  /**
   * Publish a topic inside the current browser tab
   * @param topic Name of the topic
   * @param message Message of the topic
   */
  publish(topic: any, message?: any) {
    this.subject.next({topic: topic, message: message});
  }

  /**
   * Subscribe to a topics and receive messages
   * @param topics One or more topics to listen to
   */
  topic<T>(...topics: string[]): Observable<T> {
    return this.subject
      .asObservable().pipe(
        filter(data => topics.includes(data.topic)),
        map(data => data.message));
  }
}
