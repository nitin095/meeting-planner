import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.css']
})
export class MeetingDetailsComponent implements OnInit {

  public userDetails = this.appService.getUserInfoFromLocalstorage();
  public meetingDetails: any;
  public creator: any;
  public invitees: any;

  constructor(private _route: ActivatedRoute, public router: Router, private appService: AppService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      let meetingId = this._route.snapshot.paramMap.get('meetingId');
      this.getMeeting(meetingId);
    });
  }

  getMeeting = (meetingId) => {

    this.appService.getMeetingDetails(meetingId).subscribe(
      response => {
        this.meetingDetails = response.data;
        this.getCreator(this.meetingDetails.creator);
        this.getInvitees(this.meetingDetails.invitees)
      },
      error => {
        console.log(error.errorMessage)
      }
    )//end subscribe

  }//end getMeeting

  getCreator = (creatorId) => {

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

    this.invitees = new Array;

    for (let id of userIds) {
      this.appService.getUser(id).subscribe(
        response => {
          console.log(response)
          this.invitees.push(response.data);
          console.log(this.invitees)
        },
        error => {
          console.log(`ERROR! ${error.errorMessage}`)
        }
      )
    }

  }//end getInvitees

}
