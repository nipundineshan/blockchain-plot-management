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
import { authGuard } from './core/guards/auth.guard';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';
import { superAdminGuard } from './core/guards/super-admin.guard';

import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
import { AdminPropertiesComponent } from './admin-properties/admin-properties.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminVerificationsComponent } from './admin-verifications/admin-verifications.component';
import { AdminDocumentsComponent } from './admin-documents/admin-documents.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminAddAdminComponent } from './admin-add-admin/admin-add-admin.component';

import { RegisterPlotComponent } from './register-plot/register-plot.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SavedPropertiesComponent } from './saved-properties/saved-properties.component';
import { MyDocumentsComponent } from './my-documents/my-documents.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'browse', component: BrowsePropertiesComponent },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: 'pending-approval', component: PendingApprovalComponent },
  { 
    path: 'user/dashboard', 
    component: UserDashboardComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'user/register-plot',
    component: RegisterPlotComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'user/profile',
    component: UserProfileComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'user/settings',
    component: UserProfileComponent, // Using profile for settings for now
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'user/saved',
    component: SavedPropertiesComponent,
    canActivate: [authGuard, userGuard]
  },
  {
    path: 'user/documents',
    component: MyDocumentsComponent,
    canActivate: [authGuard, userGuard]
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/properties',
    component: AdminPropertiesComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/add-admin',
    component: AdminAddAdminComponent,
    canActivate: [authGuard, superAdminGuard]
  },
  {
    path: 'admin/verifications',
    component: AdminVerificationsComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/documents',
    component: AdminDocumentsComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'admin/settings',
    component: AdminSettingsComponent,
    canActivate: [authGuard, adminGuard]
  },
  { 
    path: 'authority/dashboard', 
    component: AuthorityDashboardComponent,
    canActivate: [authGuard, superAdminGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'blockchain/:transactionId',
    component: BlockchainVerificationComponent,
  },
  { path: '**', component: NotFoundComponent },
];
