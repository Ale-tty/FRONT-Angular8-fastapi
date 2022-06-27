import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {map} from 'rxjs/operators';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {    
      if (this.isLogged()) {
        return true;
      } else {
        console.log('No estás logueado');
        this.router.navigate(['login']);
        return false;
      }}

    // return this.authenticationService.getStatus().pipe(
    //   map(status => {
    //     if (status) {
    //       return true;
    //     } else {
    //       this.router.navigate(['login']);
    //       return false;
    //     }
    //   })
    // );

    isLogged() {
      console.log(this.tokenStorage.getToken());
      return this.tokenStorage.getToken() !== null;
    }
}