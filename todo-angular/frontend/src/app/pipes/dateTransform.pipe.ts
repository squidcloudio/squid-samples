import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { FormatTypes } from '../interfaces';

@Pipe({ name: 'transformDate' })
export class DateTransformPipe implements PipeTransform {
  transform(value: any): any {
    return moment(value, FormatTypes.ISO_FORMAT).add(1, 'day').from(moment().startOf('day'));
  }
}
