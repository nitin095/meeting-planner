import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

import { FullCalendarModule } from 'ng-fullcalendar';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'signup', component: SignupComponent},
      { path: 'meeting/:meetingId', component: MeetingDetailsComponent}
    ])
  ],
  declarations: [
    DashboardComponent,
    SignupComponent,
    MeetingDetailsComponent
  ]
})
export class UserModule { }
