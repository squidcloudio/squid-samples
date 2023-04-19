import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input('title') title?: string;
  @Input('type') type?: string;
  @Input('inputId') inputId?: string;
  @Input('controlName') controlName?: string;
  @Input('control') control?: FormGroup;
  constructor(readonly themeService: ThemeService) {}
}
