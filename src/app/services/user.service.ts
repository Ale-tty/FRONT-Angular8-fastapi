import { Injectable } from '@angular/core';
import {User} from '../interfaces/user';
//import {AngularFireDatabase} from 'angularfire2/database';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { CookieService } from "ngx-cookie-service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private angularFireDatabase: AngularFireDatabase
  private userURL = 'http://localhost:8000/user/login';
  
  private httpOptions = {
    headers: new HttpHeaders( { 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) {}

  public login(user: any): Observable<any> {
    console.log('service '+user.email);
    return this.httpClient.post<any>(this.userURL, user, this.httpOptions)
    .pipe(
      retry(3),
      catchError(this.httpErrorHandler)
    );
  }

  //logout this.cookies.delete("token");
  
  getUsers() {
    return //this.angularFireDatabase.list('/users');
  }
  getUserById(uid) {
    return //this.angularFireDatabase.object('/users/' + uid);
  }
  createUser(user) {
    return //this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  editUser(user) {
    return //this.angularFireDatabase.object('/users/' + user.uid).set(user);
  }
  setAvatar(avatar, uid) {
    return //this.angularFireDatabase.object('/users/' + uid + '/avatar').set(avatar);
  }
  addFriend(userId, friendId) {
    //this.angularFireDatabase.object('users/' + userId + '/friends/' + friendId).set(friendId);
    return //this.angularFireDatabase.object('users/' + friendId + '/friends/' + userId).set(userId);
  }

  // setToken(token: string) {

  //   this.cookies.set("token", token);
  // }
  // getToken() {
  //   return this.cookies.get("token");
  // }

  getUser() {
    return this.httpClient.get("https://reqres.in/api/users/2");
  }
  getUserLogged() {
    // const token = this.getToken();
    // Aquí iría el endpoint para devolver el usuario para un token
  }

  
  private httpErrorHandler (error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
       console.error("A client side error occurs. The error message is " + error.message);
    } else {
       console.error(
          "An error happened in server. The HTTP status code is "  + error.status + " and the error returned is " + error.message);
    }
 
    return throwError("Error occurred. Pleas try again");
 }
}
