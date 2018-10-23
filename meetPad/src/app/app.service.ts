import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://localhost:3000/api/v1';

  constructor(private _http: HttpClient) {
    console.log('app-service called')
  }

  private handleError(err: HttpErrorResponse) {
    console.log("Handle error Http calls")
    console.log(err.message);
    return Observable.throw(err.message)
  }

  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  } // end getUserInfoFromLocalstorage


  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  signup(userType,data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/${userType}/signup`, data);
    return response
  }

  login(userType,data): Observable<any> {
    let myResponse = this._http.post(`${this.baseUrl}/${userType}/login`, data)
    return myResponse;
  }// end login

  getAllMeetings(userId: string): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/all?userId=${userId}`)
    return response
  }

  getAllAdminMeetings(adminId: string): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/all/admin?adminId=${adminId}`)
    return response
  }

  getAllUsers(authToken): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/users/view/all?authToken=${authToken}`)
    return response
  }

  public logout(userType): Observable<any> {
    console.log( Cookie.get('authtoken'))
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'));
    return this._http.post(`${this.baseUrl}/${userType}/logout`, params);
  } // end logout function

  createMeeting(data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/meetings/create`, data)
    return response
  }
}
