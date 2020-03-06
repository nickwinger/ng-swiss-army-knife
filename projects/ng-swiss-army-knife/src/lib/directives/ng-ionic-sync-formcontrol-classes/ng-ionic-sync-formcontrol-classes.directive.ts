import { Directive, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngIonSync]'
})
export class NgIonicSyncFormcontrolClassesDirective implements OnDestroy {
  mutationObserver: MutationObserver;

  @HostBinding('class.ion-dirty') ionDirty         = false;
  @HostBinding('class.ion-pristine') ionPristine   = true;
  @HostBinding('class.ion-touched') ionTouched     = false;
  @HostBinding('class.ion-untouched') ionUnTouched = true;

  private _ionItem: HTMLElement;

  get ionItem(): HTMLElement {
    if (!this._ionItem) {
      this._ionItem = this.el.nativeElement.closest('ion-item');
    }

    return this._ionItem;
  }

  constructor(private el: ElementRef) {

    const setIonItemClass = (cssClass: string, visible: boolean) => {
      if (!this.ionItem) {
        return;
      }

      if (!visible) {
        this.ionItem.classList.remove(cssClass);
      } else if (!this.ionItem.className.includes(cssClass)) {
        this.ionItem.classList.add(cssClass);
      }
    };

    const checkMutations = new Subject<MutationRecord[]>();

    checkMutations.pipe(
      debounceTime(100),
      tap(() => {
        const cssClasses: string = el.nativeElement.className;
        if (cssClasses.includes('ng-touched')) {
          this.ionTouched   = true;
          this.ionUnTouched = false;

          // If we have an ion-item as a parent also sync its classes
          setIonItemClass('ion-touched', true);
          setIonItemClass('ion-untouched', false);
        }
        if (cssClasses.includes('ng-untouched')) {
          this.ionUnTouched = true;
          this.ionTouched   = false;

          // If we have an ion-item as a parent also sync its classes
          setIonItemClass('ion-touched', false);
          setIonItemClass('ion-untouched', true);
        }
        if (cssClasses.includes('ng-pristine')) {
          this.ionPristine = true;
          this.ionDirty    = false;

          // If we have an ion-item as a parent also sync its classes
          setIonItemClass('ion-pristine', true);
          setIonItemClass('ion-dirty', false);
        }
        if (cssClasses.includes('ng-dirty')) {
          this.ionPristine = false;
          this.ionDirty    = true;

          // If we have an ion-item as a parent also sync its classes
          setIonItemClass('ion-pristine', false);
          setIonItemClass('ion-dirty', true);
        }
      })
    ).subscribe();

    this.mutationObserver = new MutationObserver(mutations => {
      // Use a subject for debouncing
      checkMutations.next(mutations);
    });

    this.mutationObserver.observe(el.nativeElement, {
      attributes: true,
      attributeFilter: ['style', 'class']
    });
  }

  ngOnDestroy(): void {
    this.mutationObserver.disconnect();
  }
}
