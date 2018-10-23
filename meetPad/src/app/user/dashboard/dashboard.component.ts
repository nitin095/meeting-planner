import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Location]
})

export class DashboardComponent implements OnInit {

  public userDetails = this.appService.getUserInfoFromLocalstorage();
  public allMeetings: any;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
    this.getAllMeetings()
  }

  getAllMeetings(): any {
    console.log('running getAllMeetings')
    this.appService.getAllMeetings(this.userDetails.userId).subscribe(

      response => {
        if (response.status === 200) {
          console.log(response);
          this.allMeetings = response.data
        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("some error occured");
        console.log(error)
      }

    )

  }//end getAllMeetings function

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
