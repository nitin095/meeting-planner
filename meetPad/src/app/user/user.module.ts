import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FullCalendarModule } from 'ng-fullcalendar';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    FullCalendarModule,
    FontAwesomeModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'meeting/:meetingId', component: MeetingDetailsComponent}
    ])
  ],
  declarations: [
    DashboardComponent,
    MeetingDetailsComponent
  ]
})
export class UserModule { }
