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

  private iconList: string[] = ['archer_logo', 'search_icon', 'up_arrow'];

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
