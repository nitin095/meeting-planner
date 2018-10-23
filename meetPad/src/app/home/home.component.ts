import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../app.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private appService: AppService) { }

  public email: String;
  public password: String

  ngOnInit() {
  }

  login(): any {
    
    let loginData = {
      email: this.email,
      password: this.password,
    }// end login data

    this.appService.login('users',loginData).subscribe(

      response => {
        if (response.status === 200) {
          console.log(response)

           Cookie.set('authtoken', response.data.authToken);
          
           Cookie.set('receiverId', response.data.userDetails.userId);
          
           Cookie.set('receiverName', response.data.userDetails.firstName + ' ' + response.data.userDetails.lastName);
         
           this.appService.setUserInfoInLocalStorage(response.data.userDetails)
          
           setTimeout(() => {
            this.router.navigate(['/dashboard']);
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
