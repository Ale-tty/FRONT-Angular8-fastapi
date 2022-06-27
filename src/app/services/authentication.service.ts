import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage.service';
//import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private angularFireAuth: AngularFireAuth
  constructor(private tokenStorage: TokenStorageService) { }
  
  loginWithEmail(email: string, password: string) {
    return {"data": "token"}//this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }
  registerWithEmail(email: string, password: string) {
    return //this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getStatus() {
    return this.tokenStorage.getToken() //this.angularFireAuth.authState;
  }
  logOut() {
    return this.tokenStorage.signOut()//this.angularFireAuth.auth.signOut();
  }

  isLogged() {
    return this.tokenStorage.getToken() !== null;
  }
}
