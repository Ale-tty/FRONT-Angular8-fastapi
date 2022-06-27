import { Component, OnInit } from '@angular/core';
import { People } from '../models/people';
import { Response } from '../models/response';
import { PeopleService } from '../services/people.service';
import { ToastrService } from 'ngx-toastr';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-lista-people',
  templateUrl: './lista-people.component.html',
  styleUrls: ['./lista-people.component.css']
})

export class ListaPeopleComponent implements OnInit {

  people: People[] = [];

  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.cargarPeople();
    //this.getUserLogged();
    
  }

  // getUserLogged() {
  //   this.userService.getUser().subscribe(user => {
  //     console.log(user);
  //   });
  // }

  cargarPeople(): void {
    this.peopleService.lista().subscribe(
      (data: Response<People[]>) => {
        this.people.length = 0;                             // Clear contents
        this.people.push.apply(this.people, data['data']);  // Append new contents
      },
      err => {
        console.log(err);
      }
    );
  }

  borrar(id: string) {
    this.peopleService.delete(id).subscribe(
      data => {
        this.toastr.success('Person deleted', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarPeople();
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
