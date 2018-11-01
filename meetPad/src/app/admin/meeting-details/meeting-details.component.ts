import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Location } from '@angular/common';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ThemePalette } from '@angular/material/core';
import { faCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css'],
})
export class MeetingDetailsComponent implements OnInit {

  colorCircle = faCircle;
  colorCheckCircle = faCheckCircle;

  public min = new Date();
  public chipColor: ThemePalette;
  public allUsers: any;
  public invitees: any[];
  public title: string;
  public start: string;
  public end: string;
  public location: string;
  public notes: string;
  public alerts: any[];
  public meetingColor: string = "purple";
  public meetingId: string;
  public pageTitle: string = 'Create new meeting';
  public buttonText: string = 'Create meeting';

  constructor(private _route: ActivatedRoute, private router: Router, private routeLocation: Location, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.meetingId = this._route.snapshot.paramMap.get('meetingId');
    });
    this.getAllUsers();
    this.invitees = new Array;
    this.alerts = new Array;
    this.chipColor = 'warn';
    this.alerts.push({ type: 'email', number: 30, timeType: 'minutes' });
    this.alerts.push({ type: 'notification', number: 1, timeType: 'minutes' });
  }

  getAllUsers(): any {
    this.appService.getAllUsers(Cookie.get('authtoken')).subscribe(
      response => {
        if (response.status === 200) {
          this.allUsers = response.data;
          if (this.meetingId) {
            this.getMeeting(this.meetingId);
            this.pageTitle = "Edit meeting";
            this.buttonText = "Edit meeting"
          }
        } else {
          console.log("Couldn't get users")
          console.log(response.message)
        }
      },
      error => {
        console.log("some error occured");
        console.log(error)
      }
    )
  }//end getAllUsers function


  addInvitee(user) {
    if (!this.invitees.includes(user))
      this.invitees.push(user);
    else
      this.invitees.splice(this.invitees.indexOf(user), 1);
  }//end addInvitee

  removeInvitee(invitee) {
    this.invitees.splice(this.invitees.indexOf(invitee), 1);
  }//end removeInvitees

  isSelected(user) {
    if (this.invitees.includes(user))
      return true
    else
      return false
  }

  selectColor(color) {
    this.meetingColor = color;
  }

  createMeeting() {

    if (!this.title || !this.start || this.invitees.length < 1) {
      console.log('fill required values')
    } else {
      let minutes = { 'minutes': 1, 'hours': 60, 'days': 1440 };
      let inviteesId = this.invitees.map(invitee => invitee.userId);
      let emailAlerts = this.alerts.map(alert => alert.type == 'email' ? alert.number * minutes[alert.timeType] : null)
      let notificationAlerts = this.alerts.map(alert => alert.type == 'notification' ? alert.number * minutes[alert.timeType] : null)

      let meetingData = {
        creator: Cookie.get('receiverId'),
        title: this.title,
        notes: this.notes,
        startTime: this.start,
        endTime: this.end,
        location: this.location,
        emailAlerts: emailAlerts.toString(),
        notificationAlerts: notificationAlerts.toString(),
        invitees: inviteesId.toString(),
        meetingColor: this.meetingColor
      }
      console.log(meetingData)

      if (!this.meetingId) {

        this.appService.createMeeting(meetingData).subscribe(
          response => {
            this.snackBar.open('Meeting created sucessfully', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
            console.log('meeting created sucessfully');
            console.log(response)
            this.router.navigate(['admin/dashboard']);
          },
          error => {
            this.snackBar.open('Some error occured', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
            console.log('some error occured');
            console.log(error.errorMessage)
          }
        )
      } else {

        this.appService.editMeeting(this.meetingId, meetingData).subscribe(
          response => {
            this.snackBar.open('Meeting edited sucessfully', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
            console.log('meeting edited sucessfully');
            console.log(response)
            this.routeLocation.back()
          }, error => {
            this.snackBar.open('Some error occured', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
            console.log('some error occured');
            console.log(error.errorMessage)
          }
        )

      }//end else

    }//end outer else

  }//end createMeeting

  addAlert() {
    this.alerts.push({ type: 'email', number: 10, timeType: 'minutes' });
  }

  removeAlert(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  getMeeting = (meetingId) => {
    console.log('getting details for ' + meetingId)
    this.appService.getMeetingDetails(meetingId).subscribe(
      response => {
        console.log(response)
        let meetingDetails = response.data;
        console.log(meetingDetails)
        this.title = meetingDetails.title;
        this.notes = meetingDetails.notes;
        this.start = meetingDetails.time.start;
        this.end = meetingDetails.time.end;
        this.location = meetingDetails.location;
        this.meetingColor = meetingDetails.meetingColor;
        // this.getInvitees(this.meetingDetails.invitees)

        for (let invitee of this.allUsers) {
          if (meetingDetails.invitees.includes(invitee.userId)) {
            this.invitees.push(invitee);
          }
        }

      },
      error => {
        console.log(error.errorMessage)
      }
    )//end subscribe


  }//end getMeeting


}
