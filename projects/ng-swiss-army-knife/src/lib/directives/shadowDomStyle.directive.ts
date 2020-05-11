import { Directive, ElementRef, Input } from '@angular/core';
import { waitForProperty } from '../helper/misc';

export interface ShadowDomStyleDirectiveParam {
  selector: string;
  style: Partial<CSSStyleDeclaration>;
}

@Directive({
  selector: '[shadowStyle]'
})
export class ShadowDomStyleDirective {
  @Input()
  set shadowStyle(value: ShadowDomStyleDirectiveParam) {
    const elem = this.el.nativeElement as HTMLElement;

    waitForProperty(elem, obj => elem.shadowRoot.querySelector(value.selector))
      .subscribe((shadowElem: HTMLElement) => {
        if (!shadowElem || !value) {
          return;
        }
        for (const style of Object.keys(value.style)) {
          if (!shadowElem.style || !value.style) {
            continue;
          }
          shadowElem.style[style] = value.style[style];
        }
      });
  }

  constructor(private el: ElementRef) {

  }
}
