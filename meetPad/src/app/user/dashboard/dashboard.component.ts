import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from './../../socket.service';
import { MatSnackBar } from '@angular/material';

//importing ng-fullCalender 
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Location, SocketService]
})

export class DashboardComponent implements OnInit {

  public authToken: any;
  public userDetails = this.appService.getUserInfoFromLocalstorage();
  public userId: string;
  public userName: string;
  public allMeetings: any = [];
  public isAdmin: boolean;

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private _route: ActivatedRoute, private router: Router, private appService: AppService, public snackBar: MatSnackBar, public SocketService: SocketService) { }

  ngOnInit() {
    this._route.queryParams.subscribe(params => {
      if (params['uid']) {
        this.isAdmin = true
        this.userId = params['uid'];
        this.getUser(params['uid'])
      } else {
        this.isAdmin = false
        this.userName = `${this.userDetails.firstName} ${this.userDetails.lastName}`;
        this.userId = this.userDetails.userId
      }
    });
    this.authToken = Cookie.get('authtoken');
    this.loadCalender();
    this.verifyUserConfirmation();
    this.getAlerts();
  }
  //end ngOnInit

  loadCalender(): any {

    let getMeetings = new Promise((resolve, reject) => {
      this.appService.getAllMeetings(this.userId).subscribe(
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
              start: meeting.time.start,
              meetingId: meeting.meetingId,
              color: meeting.meetingColor
            });
          }
          callback(events);
        },//end events
        timezone: 'local',
        eventTextColor: 'white',
        timeFormat: 'h(:mm)t',
        height: 'parent'
      };//end calenderOptions
    });
  }

  eventClick = (meeting) => {
    console.log(meeting.event);
    this.router.navigate(['meeting', meeting.event.meetingId]);
  }

  dayClick = (event) => {
    if (event.view.name != 'month')
      return;
    this.ucCalendar.fullCalendar('changeView', 'agendaDay')
    this.ucCalendar.fullCalendar('gotoDate', event.date);
  }

  private getUser = (uid) => {
    console.log('getUser called with uid: ' + uid)
    this.appService.getUser(uid).subscribe(
      response => {
        this.userDetails = response.data;
        this.userName = `${this.userDetails.firstName} ${this.userDetails.lastName}`
      },
      error => {
        console.log(`ERROE! ${error.errorMessage}`)
      }
    )
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

  public verifyUserConfirmation: any = () => {
    this.SocketService.verifyUser()
      .subscribe((data) => {
        this.SocketService.setUser(this.authToken);
      });
  }

  public getAlerts(): any {
    this.SocketService.notificationAlert().subscribe((data) => {
      console.log('ALERT RECEIVED FROM SERVER!')
      console.log(data);
      let alertSnackBar = this.snackBar.open(`${data.title} @ ${data.time.start}`, 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
      alertSnackBar.afterDismissed().subscribe(() => {
        console.log('The snack-bar was dismissed');
      });
    });
  }//end getAlerts

}
