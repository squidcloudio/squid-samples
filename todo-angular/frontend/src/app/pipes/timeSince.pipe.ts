import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

@Pipe({ name: 'timeSince' })
export class TimeSincePipe implements PipeTransform {
  transform(value: any): any {
    dayjs.extend(relativeTime);
    return dayjs(value).from(dayjs().format('M/D/YYYY'));
  }
}
