import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/Account';
import { EnfantService } from 'src/app/services/enfant.service';
import { User } from '../../../../models/User';

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

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private enfantService: EnfantService,
    private toastr: ToastrService
  ) {
    // check if we're in edit mode
    if (route.snapshot.params.id) {
      this.loadEnfantToEdit(route.snapshot.params.id);
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      role: [null],
      bDate: ['', Validators.compose([Validators.required])],
      gender: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    const enfant = this.form.value;
    enfant.account = new Account(this.form.value.username, this.form.value.password);
    this.enfantService.addEnfant(enfant).delay(1000).subscribe(resp => {
      this.toastr.success('Registered successfully');
      this.submitted = false;
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occured' : 'Error occured';
      this.toastr.error(message);
    });
  }

  loadEnfantToEdit(id) {

  }

}
