import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: 'sidebar-navigation.component.html',
  styleUrls: ['sidebar-navigation.component.scss'],
})
export class SidebarNavigationComponent {
  constructor(readonly dialogRef: DialogRef<string>, readonly themeService: ThemeService) {}

  close(): void {
    this.dialogRef.close();
  }
}
