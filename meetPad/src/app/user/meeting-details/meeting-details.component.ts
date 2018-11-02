import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  public userDetails = this.appService.getUserInfoFromLocalstorage();
  public meetingDetails: any;
  public creator: any;
  public invitees: any = [];
  public isAdmin: boolean;

  constructor(private _route: ActivatedRoute, public router: Router, private routeLocation: Location, private appService: AppService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let meetingId = this._route.snapshot.paramMap.get('meetingId');
      this.getMeeting(meetingId);
    });
    if (this.userDetails.adminId) {
      this.isAdmin = true
    }

  }

  getMeeting = (meetingId) => {

    this.appService.getMeetingDetails(meetingId).subscribe(
      response => {
        console.log(response)
        this.meetingDetails = response.data;
        this.getCreator(response.data.creator);
        this.getInvitees(response.data.invitees)
      },
      error => {
        console.log(error.errorMessage)
      }
    )//end subscribe

  }//end getMeeting

  getCreator = (creatorId) => {
    
    console.log('inside grtcreator. AdminId is '+creatorId)
    this.appService.getAdmin(creatorId).subscribe(
      response => {
        console.log(response)
        this.creator = response.data
      },
      error => {
        console.log(`ERROR! ${error.errorMessage}`)
      }
    )
  }//end getCreator

  getInvitees = (userIds) => {

    // this.invitees = new Array;

    for (let id of userIds) {
      this.appService.getUser(id).subscribe(
        response => {
          this.invitees.push(response.data);
        },
        error => {
          console.log(`ERROR! ${error.errorMessage}`)
        }
      )
    }

  }//end getInvitees

  editMeeting = () => {
    this.router.navigate([`/admin/meeting/${this.meetingDetails.meetingId}/edit`]);
  }

  deleteMeeting = () => {
    this.appService.deleteMeeting(this.meetingDetails.meetingId).subscribe(
      response => {
        this.snackBar.open('Meeting deleted sucessfully', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
        console.log('meeting deleted sucessfully');
        console.log(response)
        this.routeLocation.back()
      }
    )
  }

}
