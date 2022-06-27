import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { People } from '../models/people';

@Component({
  selector: 'app-detalle-people',
  templateUrl: './detalle-people.component.html',
  styleUrls: ['./detalle-people.component.css']
})
export class DetallePeopleComponent implements OnInit {

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
        console.log(data.data['id']);
        this.people = data.data;
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
