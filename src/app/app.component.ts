import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'People';
  userAdded = false;
  userAddedSubscription: Subscription;
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.userSub.subscribe((user) => {
      this.isAuthenticated = user ? true : false;
    });
  }

  onLoginClick() {}

  onLogoutClick() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userAddedSubscription.unsubscribe();
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}