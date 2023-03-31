import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'formatDate' })
export class FormatDatePipe implements PipeTransform {
  transform(value: any, format: string): any {
    return moment(value, 'MM-DD-YYYY').format(format);
  }
}
