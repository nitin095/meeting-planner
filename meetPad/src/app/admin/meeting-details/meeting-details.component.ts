import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  public allUsers: any;
  public invitees: any[];
  public title: string;
  public start: string;
  public end: string;
  public location: string;
  public emailAlerts: string;
  public notificationAlerts: string;
  public notes: string;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.getAllUsers();
    this.invitees = new Array;
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
  }//end addInvitee

  removeInvitee(invitee) {
    this.invitees.splice(this.invitees.indexOf(invitee), 1);
  }//end removeInvitees

  createMeeting() {

    let inviteesId = this.invitees.map(invitee => invitee.userId);

    let meetingData = {
      creator: Cookie.get('receiverId'),
      title: this.title,
      notes: this.notes,
      startTime: this.start, 
      endTime: this.end,
      location: this.location,
      emailAlerts: this.emailAlerts,
      notificationAlerts: this.notificationAlerts,
      invitees: inviteesId.toString()
    }
    console.log(meetingData)

    this.appService.createMeeting(meetingData).subscribe(
      response => {
        console.log('meeting created sucessfully');
        console.log(response)
        this.router.navigate(['admin/dashboard']);
      },
      error => {
        console.log('some error occured');
        console.log(error.errorMessage)
      }
    )

  }

}
