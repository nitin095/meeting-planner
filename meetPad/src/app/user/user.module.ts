import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'dashboard', component: DashboardComponent },
      { path: 'signup', component: SignupComponent}
    ])
  ],
  declarations: [
    DashboardComponent,
    SignupComponent
  ]
})
export class UserModule { }
