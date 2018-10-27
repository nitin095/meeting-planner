import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackBtnComponent } from './back-btn/back-btn.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [BackBtnComponent],
  exports: [
    FormsModule,
    BackBtnComponent,
    FontAwesomeModule
  ]
})
export class SharedModule { }
