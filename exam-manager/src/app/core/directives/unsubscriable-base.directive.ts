import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appUnsubscriableBase]'
})
export class UnsubscriableBaseDirective implements OnDestroy {
  unsubscribe = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.additionalCleanUp()
  }

  protected additionalCleanUp(): void { }
}
