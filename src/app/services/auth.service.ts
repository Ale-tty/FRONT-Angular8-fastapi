import { User } from './../auth/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
  access_token: string;
  // email: string;
  // refreshToken: string;
  // expiresIn: string;
  localId?: string;
  // registered?: boolean;
  email?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  userSub = new BehaviorSubject<User>(null);
  clearTimeout: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyASi_-Ea6ygtX9MSBhvqYMIS6MUyy3F3s0
    `,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  // retry(3),
  login(email: string, password: string) {
    let authResponseData = this.http.post<AuthResponseData>('http://localhost:8000/user/login', { email, password })
    return this.http.post<AuthResponseData>('http://localhost:8000/user/login', { email, password })
    .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(response: AuthResponseData) {
    let payload = atob(response.access_token.split('.')[1])
    var parsed = JSON.parse(payload)
    let expiresIn = parsed['expires']
    let userID = parsed['user_id']
    const expireDate = new Date(expiresIn * 1000);
    const user = new User(
      userID,
      '1',
      response.access_token,
      expireDate
    );
    this.userSub.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    
    let date = new Date().getTime();
    let expirationDate = expireDate.getTime()

    this.autoLogout(expirationDate - date);
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    let userData: {
      email: string;
      _token: string;
      expirationDate: string;
      localId: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    let user = new User(
      userData.email,
      userData.localId,
      userData._token,
      new Date(userData.expirationDate)
    );

    if (user.token) {
      this.userSub.next(user);
    }

    let date = new Date().getTime();
    let expirationDate = new Date(userData.expirationDate).getTime();
    
    this.autoLogout(expirationDate - date);
  }

  autoLogout(expirationDate: number) {
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    this.userSub.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
    });
  }
}
