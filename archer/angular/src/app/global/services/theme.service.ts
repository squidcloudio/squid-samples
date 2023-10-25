import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, ReplaySubject } from 'rxjs';

export type SquidTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeSubject = new ReplaySubject<SquidTheme>(1);

  private iconList: string[] = [
    'archer_logo',
    'search_icon',
    'up_arrow',
    'hero_logo',
    'MSFT_icon',
    'META_icon',
    'TSLA_icon',
    'DIS_icon',
    'AAPL_icon',
    'AMZN_icon',
    'NFLX_icon',
    'GOOG_icon',
    'back_arrow_icon',
    'phone_icon',
    'website_icon',
    'close_icon',
    'logout_icon',
    'portfolio_icon',
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  initialize(): void {
    this.initializeIcons();
    this.setInitialTheme();
  }

  setTheme(theme: SquidTheme): void {
    this.document.body.classList.remove('light', 'dark');
    this.document.body.classList.add(theme);
    this.themeSubject.next(theme);
  }

  observeTheme(): Observable<SquidTheme> {
    return this.themeSubject.asObservable();
  }

  private initializeIcons(): void {
    for (const iconName of this.iconList) {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${iconName}.svg`),
      );
    }
  }

  private setInitialTheme(): void {
    this.setTheme('light');
  }
}
