import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSnackBar } from '@angular/material';
import { SocketService } from './../../socket.service';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [Location, SocketService]
})
export class DashboardComponent implements OnInit {

  faCircle = faCircle

  constructor(private router: Router, private appService: AppService, public snackBar: MatSnackBar, public SocketService: SocketService) { }

  public searchInput: string;
  public authToken: any;
  public adminDetails = this.appService.getUserInfoFromLocalstorage();
  public allMeetings: any;
  public allUsers: any;
  public onlineUsers: any = [];

  ngOnInit() {
    this.authToken = Cookie.get('authtoken');
    this.getAllMeetings();
    this.getAllUsers();
    this.verifyUserConfirmation();
    this.getOnlineUsers()
  }

  getAllMeetings(): any {

    this.appService.getAllAdminMeetings(this.adminDetails.adminId).subscribe(
      response => {
        if (response.status === 200) {
          this.allMeetings = response.data
        } else {
          console.log(response.message)
        }
      },
      error => {
        this.snackBar.open('Some error occured', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )

  }//end getAllMeetings function

  getAllUsers(): any {

    this.appService.getAllUsers(Cookie.get('authtoken')).subscribe(
      response => {
        if (response.status === 200) {
          this.allUsers = response.data
        } else {
          console.log("Couldn't get users")
          console.log(response.message)
          if (response.message == 'Failed To Authorized') {
            this.snackBar.open('Authorization error!', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
            this.router.navigate(['/']);
          }
        }
      },
      error => {
        this.snackBar.open('Some error occured', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
        console.log("some error occured");
        console.log(error)
      }
    )

  }//end getAllUsers function


  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {
        // this.disconnectedSocket = false;
        this.SocketService.setUser(this.authToken);
      });
  }//end verifyUserConformation

  public getOnlineUsers(): any {
    this.SocketService.onlineUserList().subscribe(data => {
      this.onlineUsers = data;
      console.log(this.onlineUsers)
    });
  }

}
