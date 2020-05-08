import { Directive, ElementRef, Input } from '@angular/core';
import { waitForProperty } from 'ng-swiss-army-knife';

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
    console.log('1', elem, value);
    waitForProperty(elem, obj => elem.shadowRoot.querySelector(value.selector))
      .subscribe((shadowElem: HTMLElement) => {
        console.log('s', shadowElem, shadowElem.style);
        for (let style of Object.keys(value.style)) {
          shadowElem.style[style] = value.style[style];
        }
        console.log('s', shadowElem, shadowElem.style);
      });
  }

  constructor(private el: ElementRef) {

  }
}
