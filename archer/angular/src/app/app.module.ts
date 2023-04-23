import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { SquidModule } from '@squidcloud/angular';
import { Squid } from '@squidcloud/client';
import { ProtectedLayoutComponent } from './global/protected-layout/protected-layout.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { map } from 'rxjs';
import { ThemeService } from './global/services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StockComponent } from './stock/stock.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, ProtectedLayoutComponent, PortfolioComponent, StockComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule.forRoot({
      domain: 'squid-archer.us.auth0.com',
      clientId: 'aF3jhIcL7YnNFl90VZeN9JB5PzLcOSAV',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    SquidModule.forRoot({
      appId: 'nype40kqggvbfl5l7b',
      region: 'local',
    }),
    MatIconModule,
    FormsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(squid: Squid, authService: AuthService, themeService: ThemeService) {
    squid.setAuthIdToken(authService.idTokenClaims$.pipe(map((idToken) => idToken?.__raw)));
    themeService.initialize();
  }
}
