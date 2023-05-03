import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnDestroyComponent implements OnDestroy {
  protected readonly onDestroy = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
