import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../service/people.service';
import { People } from '../models/people';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-people',
  templateUrl: './nuevo-people.component.html',
  styleUrls: ['./nuevo-people.component.css']
})
export class NuevoPeopleComponent implements OnInit {

  firstname = '';
  lastname: '';

  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCreate(): void {
    const people = new People(this.firstname, this.lastname);
    this.peopleService.save(people).subscribe(
      data => {
        this.toastr.success('Person added', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

}
