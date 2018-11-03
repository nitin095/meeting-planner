import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com';

  private socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
  }

  // Listening events 

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      });
    });
  } // end verifyUser

  public onlineUserList = () => {
    console.log('running GET ALL ONLINE USERS')
    return Observable.create((observer) => {
      this.socket.on("onlineUserList", (userList) => {
        observer.next(userList);
      });
    }); 
  } // end onlineUserList

  public notificationAlert = () => {
    console.log('listening alerts from server')
    return Observable.create((observer) => {
      this.socket.on("alert", (alert) => {
        observer.next(alert);
      });
    }); 
  } // end notificationAlert

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on("disconnect", () => {
        observer.next();
      });
    }); 
  } // end disconnectSocket


  // Emitting events

  public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  } // end setUser

  public markChatAsSeen = (userDetails) => {
    this.socket.emit('mark-chat-as-seen', userDetails);
  } // end markChatAsSeen


}//end Class SocketService
