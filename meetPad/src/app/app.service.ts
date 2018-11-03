import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private baseUrl = 'http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com/api/v1';
  
  private authToken: string = Cookie.get('authtoken');

  constructor(private _http: HttpClient) {
    console.log('app-service called');
  }

  private handleError(err: HttpErrorResponse) {
    console.log("Handle error Http calls")
    console.log(err.message);
    return Observable.throw(err.message)
  }
  
  public getUserInfoFromLocalstorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  signup(userType, data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/${userType}/signup`, data);
    return response
  }

  login(userType, data): Observable<any> {
    let myResponse = this._http.post(`${this.baseUrl}/${userType}/login`, data)
    return myResponse;
  }// end login

  recoverPassword(userType, data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/${userType}/forgotPassword`, data)
    return response
  }

  resetPassword(userType, data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/${userType}/resetPassword`, data)
    return response
  }

  getAllMeetings(userId: string): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/all?userId=${userId}`)
    return response
  }

  getMeetingDetails(meetingId: string): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/${meetingId}/details`)
    return response
  }

  getAllAdminMeetings(adminId: string): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/all/admin?adminId=${adminId}`)
    return response
  }

  getUser(userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/users/${userId}/details?authToken=${this.authToken}`)
    return response
  }

  editUser(userType, userId, data): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.put(`${this.baseUrl}/${userType}/${userId}/edit?authToken=${this.authToken}`, data)
    return response
  }

  deleteUser(userType, userId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.post(`${this.baseUrl}/${userType}/${userId}/delete?authToken=${this.authToken}`, '')
    return response
  }

  getAdmin(adminId): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/admin/${adminId}/details?authToken=${this.authToken}`)
    return response
  }

  getAllUsers(authToken): Observable<any> {
    this.authToken = Cookie.get('authtoken');
    let response = this._http.get(`${this.baseUrl}/users/view/all?authToken=${authToken}`)
    return response
  }

  public logout(userType): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authtoken'));
    return this._http.post(`${this.baseUrl}/${userType}/logout`, params);
  } // end logout function

  createMeeting(data): Observable<any> {
    let response = this._http.post(`${this.baseUrl}/meetings/create`, data)
    return response
  }

  editMeeting(meetingId, data): Observable<any> {
    let response = this._http.put(`${this.baseUrl}/meetings/edit/${meetingId}`, data)
    return response
  }

  deleteMeeting(meetingId): Observable<any> {
    let response = this._http.get(`${this.baseUrl}/meetings/delete/${meetingId}`)
    return response
  }

}
