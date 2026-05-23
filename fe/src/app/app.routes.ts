import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BrowsePropertiesComponent } from './browse-properties/browse-properties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthorityDashboardComponent } from './authority-dashboard/authority-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BlockchainVerificationComponent } from './blockchain-verification/blockchain-verification.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'browse', component: BrowsePropertiesComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'authority/dashboard', component: AuthorityDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'blockchain/:transactionId',
    component: BlockchainVerificationComponent,
  },
  { path: '**', component: NotFoundComponent },
];
