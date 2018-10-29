import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AppService } from "./app.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    AdminModule,
    UserModule,
    SharedModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
