import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted = false;
  
  constructor(private authenticationService: AuthenticationService, private userService: UserService, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
        email: ['admin@admin.com', [Validators.required, Validators.email]],
        password: ['admin', [Validators.required, Validators.minLength(5)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.login(this.loginForm.value);

      // display form values on success
      // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }

  login(data) {
    const user = {email: data.email, password: data.password};
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