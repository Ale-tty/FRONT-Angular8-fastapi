import { Component, OnInit } from '@angular/core';
import { People } from '../models/people';
import { PeopleService } from '../services/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-people',
  templateUrl: './editar-people.component.html',
  styleUrls: ['./editar-people.component.css']
})
export class EditarPeopleComponent implements OnInit {
  editForm: FormGroup;
  submitted = false;

  people: People = null;

  constructor(
    private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
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

    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

    // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.editForm.invalid) {
          return;
      }

      this.onUpdate(this.editForm.value);
      //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.editForm.value, null, 4));

  }

  onUpdate(data): void {
    this.people.firstname = data.firstName;
    this.people.lastname = data.lastName;
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
