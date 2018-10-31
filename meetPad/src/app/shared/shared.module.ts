import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackBtnComponent } from './back-btn/back-btn.component';

import {
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatBadgeModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  declarations: [BackBtnComponent],
  exports: [
    FormsModule,
    BackBtnComponent,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule
  ]
})
export class SharedModule { }
