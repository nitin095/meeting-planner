import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'admin/dashboard', component: DashboardComponent},
      { path: 'admin/meeting', component: MeetingDetailsComponent},
      { path: 'admin/meeting/create', component: MeetingDetailsComponent}
    ])
  ],
  declarations: [DashboardComponent, MeetingDetailsComponent, SearchPipe]
})
export class AdminModule { }
