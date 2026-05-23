import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing.component';
import { BrowsePropertiesComponent } from './pages/browse-properties.component';
import { PropertyDetailsComponent } from './pages/property-details.component';
import { UserDashboardComponent } from './pages/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard.component';
import { AuthorityDashboardComponent } from './pages/authority-dashboard.component';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { BlockchainVerificationComponent } from './pages/blockchain-verification.component';
import { NotFoundComponent } from './pages/not-found.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'browse', component: BrowsePropertiesComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'user/dashboard', component: UserDashboardComponent },
  { path: 'admin/dashboard', component: AdminDashboardComponent },
  { path: 'authority/dashboard', component: AuthorityDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'blockchain/:transactionId', component: BlockchainVerificationComponent },
  { path: '**', component: NotFoundComponent },
];
