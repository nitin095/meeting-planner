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

  constructor(private router: Router, private appService: AppService) { }

  public adminDetails = this.appService.getUserInfoFromLocalstorage();
  public allMeetings: any;
  public allUsers: any;

  ngOnInit() {
    this.getAllMeetings();
    this.getAllUsers()
  }

  getAllMeetings(): any {
    console.log('runing getAllMeetings. getting deatils for admin: ' + this.adminDetails.adminId)
    this.appService.getAllAdminMeetings(this.adminDetails.adminId).subscribe(

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

  getAllUsers(): any {
    console.log('running getAllUsers.')
    this.appService.getAllUsers(Cookie.get('authtoken')).subscribe(

      response => {
        if (response.status === 200) {
          console.log(response);
          this.allUsers = response.data
        } else {
          console.log("Couldn't get users")
          console.log(response.message)
          if(response.message == 'Failed To Authorized'){
            this.router.navigate(['/']);
          }
        }
      },
      error => {
        console.log("some error occured");
        console.log(error)
      }

    )

  }//end getAllUsers function


  public logout: any = () => {
    this.appService.logout('admin').subscribe((apiResponse) => {
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
