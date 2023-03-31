import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'transformDate' })
export class DateTransformPipe implements PipeTransform {
  transform(value: any): any {
    return moment(value).add(1, 'day').from(moment().startOf('day'));
  }
}
