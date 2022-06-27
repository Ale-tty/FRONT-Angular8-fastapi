import { Component, OnInit } from '@angular/core';
import { People } from '../models/people';
import { PeopleService } from '../service/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-people',
  templateUrl: './editar-people.component.html',
  styleUrls: ['./editar-people.component.css']
})
export class EditarPeopleComponent implements OnInit {

  people: People = null;

  constructor(
    private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.peopleService.detail(id).subscribe(
      data => {
        this.people = data.data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onUpdate(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.peopleService.update(id, this.people).subscribe(
      data => {
        this.toastr.success('Person updated', 'OK', {
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
