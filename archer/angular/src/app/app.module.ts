import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { SquidModule } from '@squidcloud/angular';
import { Squid } from '@squidcloud/client';
import { ProtectedLayoutComponent } from './global/components/protected-layout/protected-layout.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { firstValueFrom } from 'rxjs';
import { ThemeService } from './global/services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StockComponent } from './stock/stock.component';
import { MatButtonModule } from '@angular/material/button';
import { AvatarComponent } from './global/components/avatar/avatar.component';
import { NgVarDirective } from './global/directives/ng-var.directive';
import { ChartComponent } from './global/components/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './global/components/search-bar/search-bar.component';
import { AutofocusDirective } from './global/directives/autofocus.directive';
import { PercentChangeComponent } from './global/components/percent-change/percent-change.component';
import { StockTableComponent } from './global/components/stock-table/stock-table.component';
import { TotalsComponent } from './global/components/totals/totals.component';
import { ChartControlsComponent } from './global/components/chart-controls/chart-controls.component';
import { StockChartComponent } from './global/components/stock-chart/stock-chart.component';
import { BuyOrSellStockDialogComponent } from './stock/buy-or-sell-stock-dialog/buy-or-sell-stock-dialog.component';
import { DialogCloseButtonComponent } from './global/components/dialog-close-button/dialog-close-button.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { OnDestroyComponent } from './global/components/on-destroy/on-destroy.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { environment } from '../environments/environment';
import { SquidAuthProvider } from '@squidcloud/client/dist/typescript-client/src/squid';

@NgModule({
  declarations: [
    AppComponent,
    ProtectedLayoutComponent,
    PortfolioComponent,
    StockComponent,
    AvatarComponent,
    NgVarDirective,
    AutofocusDirective,
    ChartComponent,
    HomeComponent,
    SearchBarComponent,
    PercentChangeComponent,
    StockTableComponent,
    TotalsComponent,
    ChartControlsComponent,
    StockChartComponent,
    BuyOrSellStockDialogComponent,
    DialogCloseButtonComponent,
    OnDestroyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'archer-backend-api-for-web',
      },
      cacheLocation: 'localstorage',
    }),
    SquidModule.forRoot({
      appId: environment.squidAppId,
      region: environment.squidRegion,
    }),
    MatIconModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxChartsModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(squid: Squid, authService: AuthService, themeService: ThemeService) {
    const authProvider: SquidAuthProvider = {
      getToken: async (): Promise<string | undefined> => {
        // Wait until the authentication state is resolved by Auth0.
        const user = await firstValueFrom(authService.user$);
        if (!user) {
          return undefined;
        }
        try {
          // Try to query an access token without user interaction (silently).
          // This method should never fail.
          return await firstValueFrom(authService.getAccessTokenSilently());
        } catch (e) {
          // If 'getAccessTokenSilently' is failed, it is either a network or a misconfiguration
          // (configuration change) issue.
          // In this case, log out the user: this way the user will be forced to use a UI login form.
          if ((e as Error)?.message?.includes('Login required')) {
            console.warn('Cached Auth0 token is expired. Forcing a new sign in.');
          } else {
            console.error(`Can't get Auth token, logging out.`, e);
          }
          authService.logout({ logoutParams: { returnTo: window.location.origin } });
          return undefined;
        }
      },
    };
    squid.setAuthProvider(authProvider);
    themeService.initialize();
    (window as any).squid = squid;
  }
}
