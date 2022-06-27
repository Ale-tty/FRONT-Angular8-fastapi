import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { People } from '../models/people';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-nuevo-people',
  templateUrl: './nuevo-people.component.html',
  styleUrls: ['./nuevo-people.component.css']
})
export class NuevoPeopleComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;

  constructor(
    private peopleService: PeopleService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.createForm.invalid) {
          return;
      }

      this.onCreate(this.createForm.value);
  }

  onReset() {
      this.submitted = false;
      this.createForm.reset();
  }

  onCreate(data): void {
    const people = new People(data.firstName, data.lastName);
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
