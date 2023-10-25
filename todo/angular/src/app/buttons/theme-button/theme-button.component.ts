import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-button',
  templateUrl: 'theme-button.component.html',
  styleUrls: ['theme-button.component.scss'],
})
export class ThemeButtonComponent {
  constructor(
    readonly themeService: ThemeService,
    private renderer: Renderer2,
  ) {}
  toggleTheme(): void {
    this.themeService.toggleTheme();
    if (this.themeService.isDark) this.renderer.addClass(document.body, 'body-dark');
    if (!this.themeService.isDark) this.renderer.removeClass(document.body, 'body-dark');
  }
}
