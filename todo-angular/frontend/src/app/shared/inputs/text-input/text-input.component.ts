import {Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: 'text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements OnInit{
  @Input('title') title?: string;
  @Input('type') type?: string;
  @Input('inputId') inputId?: string;
  @Input('controlName') controlName?: string;
  @Input('control') control?: FormGroup;
   initValue=''

  ngOnInit():void {
    if(this.controlName && this.control)
      this.initValue=this.control?.get(this.controlName)?.value
  }
}
