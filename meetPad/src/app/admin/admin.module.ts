import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component'


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'admin/dashboard', component: DashboardComponent},
      { path: 'admin/signup', component: SignupComponent},
      { path: 'admin/login', component: LoginComponent},
      { path: 'admin/meeting', component: MeetingDetailsComponent},
      { path: 'admin/meeting/create', component: MeetingDetailsComponent}
    ])
  ],
  declarations: [DashboardComponent, SignupComponent, LoginComponent, MeetingDetailsComponent]
})
export class AdminModule { }
