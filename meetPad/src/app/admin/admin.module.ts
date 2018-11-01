import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
 
 
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component'

import { SearchPipe } from './../search.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    SharedModule,
    DlDateTimePickerDateModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild([
      { path: 'admin/dashboard', component: DashboardComponent},
      { path: 'admin/meeting', component: MeetingDetailsComponent},
      { path: 'admin/meeting/create', component: MeetingDetailsComponent},
      { path: 'admin/meeting/:meetingId/edit', component: MeetingDetailsComponent}
    ])
  ],
  declarations: [DashboardComponent, MeetingDetailsComponent, SearchPipe]
})
export class AdminModule { }
