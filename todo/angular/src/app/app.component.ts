import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly themeService: ThemeService) {}
  today = {
    color: '#14BE6E',
    id: 'today',
    title: 'Today',
    userId: '477c8aaf-0368-4999-82f4-96ca0022ae50',
  };
  tomorrow = { color: '#FFB800', id: 'tomorrow', title: 'Tomorrow', userId: '7fbab7cc-d1a6-4bee-90f1-2185296c256d' };
  someday = { color: '#2F8CFA', id: 'someday', title: 'Someday', userId: 'b297de73-a3bc-458d-9a9f-c25d6c92f5a9' };
}
