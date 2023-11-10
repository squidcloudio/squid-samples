import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { assertTruthy } from 'assertic';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild('avatar')
  avatarElement!: ElementRef;

  @Input()
  name!: string;

  @Input()
  imageUrl?: string;

  @Input()
  fixedFontSize?: number;

  fontSize?: number;

  initials!: string;

  constructor(private readonly cd: ChangeDetectorRef) {}

  getInitials(name: string): string {
    return name
      .trim()
      .replace(/(^.)([^ ]* )?(.).*/, '$1$3')
      .trim()
      .toUpperCase();
  }

  ngOnInit(): void {
    assertTruthy(this.name);
    this.updateInitials();
  }

  ngOnChanges(): void {
    assertTruthy(this.name);
    this.updateInitials();
  }

  ngAfterViewInit(): void {
    this.setFontSize();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setFontSize();
  }

  private updateInitials(): void {
    this.initials = this.getInitials(this.name);
  }

  private setFontSize(): void {
    if (this.fixedFontSize) {
      this.fontSize = this.fixedFontSize;
    } else {
      const currentWidth = this.avatarElement.nativeElement.offsetWidth;
      this.fontSize = currentWidth > 0 ? Math.floor(currentWidth / 2.2) : undefined;
    }
    this.cd.detectChanges();
  }
}
