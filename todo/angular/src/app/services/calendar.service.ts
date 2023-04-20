import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { FormatTypes, Task } from '../interfaces';
import { TaskService } from './tasks.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  currentDate = dayjs().format(FormatTypes.DEFAULT_FORMAT);
  dateSubj: BehaviorSubject<string> = new BehaviorSubject(this.currentDate);

  constructor(private taskService: TaskService) {}

  selectDate(selectedDate: string): void {
    this.currentDate = selectedDate;
    this.dateSubj.next(selectedDate);
  }

  observeTasksOnDate(): Observable<Task[]> {
    return this.dateSubj.pipe(
      switchMap(date => {
        return this.taskService.observeTasksSortedByDate(date).pipe(
          map(items =>
            items.filter(item => {
              const isItemInProgress = dayjs(item.dueDate).diff(dayjs(), 'day');
              return isItemInProgress >= 0 && !item.completed;
            }),
          ),
        );
      }),
    );
  }
}
