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
  public filteredMeetings: any = [];
  public selectedMeetingColors: any = ['purple', 'green', 'red', 'goldenrod'];
  public isAdmin: boolean;
  public alert: any;

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
    if (!this.isAdmin) {
      this.verifyUserConfirmation();
      this.getAlerts();
    }

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
            this.calendarOptions = {
              editable: false,
              eventLimit: false,
              header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
              },
              timezone: 'local',
              eventTextColor: 'white',
              timeFormat: 'h(:mm)t',
              height: 'parent'
            };//end calenderOptions
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
        editable: this.isAdmin,
        selectable: this.isAdmin,
        nowIndicator: true,
        // eventLimit: false,
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
    this.router.navigate(['meeting', meeting.event.meetingId]);
  }

  dayClick = (event) => {
    if (event.view.name !== 'month') {
      return
    } else {
      this.ucCalendar.fullCalendar('changeView', 'agendaDay')
      this.ucCalendar.fullCalendar('gotoDate', event.date);
    }
  }

  select = (event) => {
    if (this.isAdmin && event.view.name !== "month") {
      this.router.navigate([`/admin/meeting/create`], { queryParams: { start: event.start._d, end: event.end._d } });
    }
  }

  toggleColor = (color) => {
    if (!this.selectedMeetingColors.includes(color))
      this.selectedMeetingColors.push(color)
    else
      this.selectedMeetingColors.splice(this.selectedMeetingColors.indexOf(color), 1);
    this.filterMeetings(this.selectedMeetingColors)
  }

  getIcon = (color) => {
    if (!this.selectedMeetingColors.includes(color))
      return 'check_box_outline_blank'
    else
      return 'check_box'
  }

  filterMeetings = (colors) => {
    this.filteredMeetings = this.allMeetings.filter(meeting => {
      return colors.includes(meeting.meetingColor)
    });
    let meetings = Object.keys(this.filteredMeetings).map(i => this.filteredMeetings[i])
    let events = [];
    for (let meeting of meetings) {
      events.push({
        title: meeting.title,
        start: meeting.time.start,
        meetingId: meeting.meetingId,
        color: meeting.meetingColor
      });
    }
    this.ucCalendar.fullCalendar('removeEvents');
    this.ucCalendar.fullCalendar('addEventSource', events);
  }//end filterMeetings

  updateMeeting = (meeting) => {
    console.log(meeting.meetingId)
    let meetingTime = {
      time: {
        start: meeting.start ? new Date(meeting.start._d).toISOString() : null,
        end: meeting.end ? new Date(meeting.end._d).toISOString() : null
      }
    }
    this.appService.editMeeting(meeting.meetingId, meetingTime).subscribe(
      response => {
        if (response.status == 200) {
          this.snackBar.open(`"${meeting.title}" updated!`, 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
          console.log(response)
        }
      },
      error => {
        this.snackBar.open(`Cannot update "${meeting.title}". ${error.errorMessage}`, 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
      }
    )
  }//end updateMeeting 

  private getUser = (uid) => {
    this.appService.getUser(uid).subscribe(
      response => {
        this.userDetails = response.data;
        this.userName = `${response.data.firstName} ${response.data.lastName}`
      },
      error => {
        console.log(`ERROR! ${error.errorMessage}`)
      }
    )
  }


  private refreshCalender() {
    this.appService.getAllMeetings(this.userId).subscribe(
      response => {
        if (response.status === 200) {
          this.allMeetings = response.data;
          this.filterMeetings(this.selectedMeetingColors)
        } else {
          this.allMeetings = [];
          this.ucCalendar.fullCalendar('removeEvents');
        }
      },
      error => {
        console.log("some error occured");
        console.log(error)
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
      this.alert = { type: data.type, event: data.event, title: data.title, time: data.time, id: data.id, display: true }
      if (data.event == 'New Meeting' || data.event == 'Meeting Deleted') {
        this.refreshCalender()
      }
    });
  }//end getAlerts


  public snooze(): any {
    this.alert.display = false;
    setTimeout(() => {
      this.alert.display = true;
    }, 5000);
  }

}
