import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
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

  constructor(private router: Router, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllUsers();
    this.invitees = new Array;
    this.alerts = new Array;
    this.chipColor = 'warn';
    this.alerts.push({ type: 'email', number: 30, timeType: 'minutes' });
    this.alerts.push({ type: 'notification', number: 30, timeType: 'minutes' });
  }

  getAllUsers(): any {
    this.appService.getAllUsers(Cookie.get('authtoken')).subscribe(
      response => {
        if (response.status === 200) {
          this.allUsers = response.data
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

    }

  }//end createMeeting

  addAlert() {
    this.alerts.push({ type: 'email', number: 10, timeType: 'minutes' });
  }

  removeAlert(alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
