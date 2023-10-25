import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ArcherUser, Ticker, UserAsset } from 'archer-common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ArcherService } from '../../global/services/archer.service';
import { OnDestroyComponent } from '../../global/components/on-destroy/on-destroy.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';

interface FormDetails {
  shares: FormControl<number | null>;
}

@Component({
  selector: 'buy-or-sell-stock-dialog',
  templateUrl: './buy-or-sell-stock-dialog.component.html',
  styleUrls: ['./buy-or-sell-stock-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyOrSellStockDialogComponent extends OnDestroyComponent {
  readonly ticker: Ticker;
  readonly buy: boolean;
  readonly userAssetSubject = new BehaviorSubject<UserAsset | undefined>(undefined);
  readonly userSubject = new BehaviorSubject<ArcherUser | undefined>(undefined);
  serverCallInProgress = false;
  form = new FormGroup<FormDetails>({
    shares: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { ticker: Ticker; buy: boolean },
    private readonly archerService: ArcherService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: DialogRef,
  ) {
    super();
    this.ticker = data.ticker;
    this.buy = data.buy;

    this.archerService
      .observeUserAsset(this.ticker.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((userAsset) => this.userAssetSubject.next(userAsset?.holding));

    this.archerService
      .observeUser()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((user) => this.userSubject.next(user));

    this.form.valueChanges.subscribe((value) => {
      const inputShares = value.shares;
      if (inputShares === null || inputShares === undefined) {
        return;
      }

      let newValue: number | undefined;
      if (inputShares < 0) {
        newValue = 0;
      } else if (this.buy) {
        const balance = this.userSubject.value?.balance ?? 0;
        const price = this.ticker.closePrice;
        if (inputShares > balance / price) {
          newValue = Math.floor(balance / price);
        }
      } else {
        const userAsset = this.userAssetSubject.value;
        console.log('Sell asset', userAsset);
        if (userAsset && inputShares > userAsset.quantity) {
          newValue = userAsset.quantity;
        }
      }

      if (newValue !== undefined) {
        this.form.controls.shares.setValue(newValue);
      }
    });
  }

  async submitOrder() {
    if (!this.form.valid) return;
    this.serverCallInProgress = true;
    try {
      const { shares } = this.form.value;
      if (!shares) return;
      if (this.buy) {
        await this.archerService.buyAsset(this.ticker.id, shares);
      } else {
        await this.archerService.sellAsset(this.ticker.id, shares);
      }
      this.snackBar.open('Congratulations! Order submitted', 'Dismiss', { duration: 5000 });
      this.dialogRef.close();
    } finally {
      this.serverCallInProgress = false;
    }
  }
}
