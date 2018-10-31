import { Component } from '@angular/core';
import { faTimesCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  faTimesCircle = faTimesCircle;
  faEnvelope = faEnvelope;
  faGithubSquare = faGithubSquare;
  title = 'app';
  public url: string = "";
  public userDetails = this.appService.getUserInfoFromLocalstorage();

  constructor(private router: Router, private appService: AppService, public snackBar: MatSnackBar) {
    router.events.subscribe((val) => {
      this.url = this.router.url;
    });
  }

  public logout: any = () => {
    let userType = 'users';
    if (this.userDetails.adminId)
      userType = 'admin';
    this.appService.logout(userType).subscribe((apiResponse) => {
      if (apiResponse.status === 200) {
        this.snackBar.open('Logged out sucessfully!', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
        console.log(apiResponse)
        Cookie.delete('authtoken');
        Cookie.delete('receiverId');
        Cookie.delete('receiverName');
        this.router.navigate(['/']);
      } else {
        console.log(apiResponse.message)
      } // end condition
    }, (err) => {
      this.snackBar.open('Some error occured', 'Close', { verticalPosition: 'top', horizontalPosition: 'end', duration: 4000, });
      console.log('some error occured')
    });
  } // end logout

}
