import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private appService: AppService) { }

  public email: String;
  public password: String

  ngOnInit() {
  }

  login(): any {
    console.log('admin login called')
    let loginData = {
      email: this.email,
      password: this.password,
    }// end login data

    this.appService.login('admin',loginData).subscribe(

      response => {
        if (response.status === 200) {
          console.log(response)

           Cookie.set('authtoken', response.data.authToken);
          
           Cookie.set('receiverId', response.data.adminDetails.adminId);
          
           Cookie.set('receiverName', response.data.adminDetails.firstName + ' ' + response.data.adminDetails.lastName);
         
           this.appService.setUserInfoInLocalStorage(response.data.adminDetails)
          
           setTimeout(() => {
            this.router.navigate(['admin/dashboard']);
          }, 1000)

        } else {
          console.log(response.message)
        }
      },
      error => {
        console.log("some error occured");
        console.log(error.error.message)
      }

    )

  }//end login function


}
