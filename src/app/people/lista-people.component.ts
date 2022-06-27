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

  currentPerson = null;
  currentIndex = -1;
  title = '';

  page = 1;
  count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];


  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    public userService: UserService
    ) { }

  ngOnInit() {
    this.cargarPeople();
    //this.getUserLogged();
  }

  getRequestParams(searchTitle, page, pageSize) {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrievePeople() {
    const params = this.getRequestParams(this.title, this.page, this.pageSize);
    /*
    this.tutorialService.getAll(params)
      .subscribe(
        response => {
          const { tutorials, totalItems } = response;
          this.tutorials = tutorials;
          this.count = totalItems;
          console.log(response);
        },
        error => {
          console.log(error);
        });*/
  }

  handlePageChange(event) {
    this.page = event;
    this.retrievePeople();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrievePeople();
  }

  setActiveTutorial(person, index) {
    this.currentPerson = person;
    this.currentIndex = index;
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
