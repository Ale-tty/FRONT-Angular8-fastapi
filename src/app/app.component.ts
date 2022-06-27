import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'List of people';

  constructor(private authenticationService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router ) { }

  isLogged() {
    return this.tokenStorage.getToken() !== null;
  }

  logout() {
    this.authenticationService.logOut()
    window.location.reload();

    //this.isLoggedIn = this.authenticationService.isLogged()
    //console.log(this.isLoggedIn);
    console.log(this.tokenStorage.getToken());
    alert('Sesioon Cerrada');
    //this.router.navigate(['login']);
    // this.authenticationService.logOut().then(() => {
    //   alert('Sesioon Cerrada');
    //   this.router.navigate(['login']);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

}
