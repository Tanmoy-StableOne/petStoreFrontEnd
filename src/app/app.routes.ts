import { UnAuthorizeComponent } from './common-component/un-authorize/un-authorize.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './page-component/home/home.component';
import { Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { RegisterDoctorComponent } from './doctor/register-doctor/register-doctor.component';
import { LivenessActionsComponent } from './livensess/liveness-actions/liveness-actions.component';
import { LivenessProfileViewComponent } from './livensess/liveness-profile-view/liveness-profile-view.component';
import { ViewLivenessComponent } from './livensess/view-liveness/view-liveness.component';
import { SanctionActionsComponent } from './sanctions/sanction-actions/sanction-actions.component';
import { ViewSanctionComponent } from './sanctions/view-sanction/view-sanction.component';
import { SanctionProfileViewComponent } from './sanctions/sanction-profile-view/sanction-profile-view.component';
import { MasterDashboardComponent } from './master/master-dashboard/master-dashboard.component';
import { ProfileControlForAdminComponent } from './master/admin/profile-control-for-admin/profile-control-for-admin.component';
import { ProfileControlForDoctorsComponent } from './master/doctor/profile-control-for-doctors/profile-control-for-doctors.component';
import { ProfileControlForSellerComponent } from './master/seller/profile-control-for-seller/profile-control-for-seller.component';
import { ProfileControlForUserComponent } from './master/user/profile-control-for-user/profile-control-for-user.component';
import { ViewDoctorsComponent } from './master/doctor/view-doctors/view-doctors.component';
import { ViewAdminsComponent } from './master/admin/view-admins/view-admins.component';
import { ViewSellerComponent } from './master/seller/view-seller/view-seller.component';
import { ViewUsersComponent } from './master/user/view-users/view-users.component';
import { AboutUsComponent } from './page-component/about-us/about-us.component';
import { ContactUsComponent } from './page-component/contact-us/contact-us.component';
import { ErrorPageComponent } from './common-component/error-page/error-page.component';
import { ControllS3Component } from './s3/controll-s3/controll-s3.component';
import { ViewS3Component } from './s3/view-s3/view-s3.component';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { RegisterSellerComponent } from './seller/register-seller/register-seller.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },

  //page components routes
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'home', component: HomeComponent },

  //error routes
  { path: 'un-authorized', component: UnAuthorizeComponent },
  { path: '**', component: ErrorPageComponent },

  //for master specific routes
  { path: 'master-dashboard', component: MasterDashboardComponent },
  { path: 'master/admin-profile-control', component: ProfileControlForAdminComponent },
  { path: 'master/view-admins', component: ViewAdminsComponent },
  { path: 'master/doctor-profile-control', component: ProfileControlForDoctorsComponent },
  { path: 'master/view-doctors', component: ViewDoctorsComponent },
  { path: 'master/seller-profile-control', component: ProfileControlForSellerComponent },
  { path: 'master/view-seller', component: ViewSellerComponent },
  { path: 'master/user-profile-control', component: ProfileControlForUserComponent },
  { path: 'master/view-user', component: ViewUsersComponent },

  //for admin specific routes
  { path: 'admin-dashboard', component: AdminDashboardComponent },

  //for doctor specific routes
  { path: 'doctor-dashboard', component: DoctorDashboardComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent },

  //for liveness specific routes
  { path: 'liveness-actions', component: LivenessActionsComponent },
  { path: 'liveness-profile-view', component: LivenessProfileViewComponent },
  { path: 'liveness-view', component: ViewLivenessComponent },

  //for seller specific routes
  { path: 'seller-dashboard', component: SellerDashboardComponent },
  { path: 'register-seller', component: RegisterSellerComponent},

  //user specific routes
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'register-user', component: RegisterUserComponent},

  //for sanction specific routes
  { path: 'sanction-actions', component: SanctionActionsComponent },
  { path: 'sanction-profile-view', component: SanctionProfileViewComponent },
  { path: 'sanction-view', component: ViewSanctionComponent },

  //s3 specific routes
  { path: 's3-control-pannel', component: ControllS3Component },
  { path: 's3-view', component: ViewS3Component },



];
