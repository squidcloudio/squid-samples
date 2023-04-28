import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-close-button',
  templateUrl: './dialog-close-button.component.html',
  styleUrls: ['./dialog-close-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCloseButtonComponent {}
