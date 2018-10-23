import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from './../../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public countryCode: number;
  public mobile: number;

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }

  signup(): any {

    let signupData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      countryCode: this.countryCode,
      mobile: this.mobile
    };

    this.appService.signup('admin',signupData).subscribe(
      response => {
        if (response.status === 200) {
          console.log(response)
          setTimeout(() => {
            this.router.navigate(['/home']);
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
  }//end signup function


}
