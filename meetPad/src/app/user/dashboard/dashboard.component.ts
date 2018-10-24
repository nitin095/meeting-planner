import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//importing ng-fullCalender 
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Location]
})

export class DashboardComponent implements OnInit {

  public userDetails = this.appService.getUserInfoFromLocalstorage();
  public allMeetings: any = [];

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.loadCalender()
  }

  loadCalender(): any {

    let getMeetings = new Promise((resolve, reject) => {
      this.appService.getAllMeetings(this.userDetails.userId).subscribe(
        response => {
          if (response.status === 200) {
            this.allMeetings = response.data;
            resolve(response.data)
          } else {
            console.log(response.message)
            reject('error occured in geetig meetings')
          }
        },
        error => {
          console.log("some error occured");
          console.log(error)
        }
      )
    });

    getMeetings.then((data) => {
      let meetings = Object.keys(data).map(i => data[i])
      this.calendarOptions = {
        editable: false,
        eventLimit: false,
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        events: function (start, end, timezone, callback) {
          let events = [];
          let userMeetings = this.allMeetings
          for (let meeting of meetings) {
            events.push({
              title: meeting.title,
              start: meeting.time.start
            });
          }
          callback(events);
        },//end events
        eventColor: 'darkmagenta',
        eventBackgroundColor: 'purple',
        eventTextColor: 'white',
        timeFormat: 'h(:mm)t',
        height: 'parent'
      };//end calenderOptions
    });
  }

  eventClick = (event) => {
    console.log(event)
  }

  dayClick = (event) => {
    if(event.view.name != 'month')
    return;
    this.ucCalendar.fullCalendar('changeView','agendaDay')
    this.ucCalendar.fullCalendar('gotoDate', event.date);
  }

  public logout: any = () => {
    this.appService.logout('users').subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        console.log("logout called")
        Cookie.delete('authtoken');
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        this.router.navigate(['/']);
      } else {
        console.log(apiResponse.message)
      } // end condition

    }, (err) => {
      console.log('some error occured')
    });
  } // end logout

}
