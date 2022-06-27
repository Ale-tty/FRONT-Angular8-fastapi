import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation: string = 'login';
  email: string = 'admin@admin.com'; // null
  password: string = 'admin'; // null
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    const user = {email: this.email, password: this.password};
    console.log(user);
    this.userService.login(user).subscribe( 
      data => {
        console.log('login.component '+data['access_token']);
        this.tokenStorage.saveToken(data['access_token']);
        console.log('storage'+this.tokenStorage.getToken());
        alert('Loggeado correctamente');
        //this.reloadPage();
        this.router.navigate(['lista-people']);
        
      },
      err => {
        alert('Ocurrioo un error');
        console.log(err);
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  register() {
    // this.authenticationService.registerWithEmail(this.email, this.password).then( (data) => {
    //   const user = {
    //     uid: data.user.uid,
    //     email: this.email,
    //     nick: this.nick
    //   };
    //   this.userService.createUser(user).then((data2) => {
    //     alert('Registrado correctamente');
    //     console.log(data2);
    //   }).catch((error) => {
    //     alert('Ocurrioo un error');
    //     console.log(error);
    //   });
    // }).catch((error) => {
    //   alert('Ocurrioo un error');
    //   console.log(error);
    // });
  }
}