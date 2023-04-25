import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ProtectedLayoutComponent } from './global/components/protected-layout/protected-layout.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { StockComponent } from './stock/stock.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProtectedLayoutComponent,
        children: [
          { path: '', component: PortfolioComponent },
          { path: 'stock/:tickerId', component: StockComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
