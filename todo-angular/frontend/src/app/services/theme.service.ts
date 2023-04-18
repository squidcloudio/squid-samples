import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  isDark = false;

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
}
