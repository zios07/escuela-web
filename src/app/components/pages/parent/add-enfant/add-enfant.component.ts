import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/Account';
import { EnfantService } from 'src/app/services/enfant.service';
import { User } from '../../../../models/User';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-enfant',
  templateUrl: './add-enfant.component.html',
  styleUrls: ['./add-enfant.component.scss']
})
export class AddEnfantComponent implements OnInit {


  title = 'Formulaire enfant';
  form: FormGroup;
  submitted = false;
  user: User = new User();
  password;
  mode = 'ADD';

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private enfantService: EnfantService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    // check if we're in edit mode
    this.loadEnfantToEdit();

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: [null],
      bDate: ['', Validators.compose([Validators.required])],
      gender: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    const enfant = this.form.value;
    enfant.account = new Account(this.form.value.username, this.form.value.password);
    // Edit moode
    if (!this.form.value.password) {
      enfant.account.password = this.password;
    }
    this.enfantService.addEnfant(enfant, this.mode).delay(1000).subscribe(resp => {
      this.toastr.success('Enfant enregistré avec succès');
      this.submitted = false;
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occured' : 'Error occured';
      this.toastr.error(message);
    });
  }

  loadEnfantToEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'EDIT';
      this.userService.findById(id).subscribe((result: User) => {
        this.fillForm(result);
      }, error => {
        this.toastr.error(String(error));
      });
    }
  }

  fillForm(enfant) {
    if (enfant) {
      this.form.get('username').disable();
      this.form.get('username').setValue(enfant.account.username);
      // this.form.get('password').setValue(enfant.account.password);
      this.form.get('password').setValidators(null);
      this.form.get('password').updateValueAndValidity();
      this.form.get('firstName').setValue(enfant.firstName);
      this.form.get('lastName').setValue(enfant.lastName);
      this.form.get('email').setValue(enfant.email);
      this.form.get('bDate').setValue(enfant.bDate);
      this.form.get('gender').setValue(enfant.gender);
      this.password = enfant.account.password;
    }
  }

}
