import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { User } from '../../../../models/User';
import { AuthenticationService } from '../../../../services/authentication.service';
import { TokenService } from '../../../../services/token.service';
import { Account } from 'src/app/models/Account';
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  title = 'Sign up';
  form: FormGroup;
  submitted = false;
  user: User = new User();

  returnUrl: string;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
      firstName:['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      role: ['', Validators.compose([Validators.required])],
      bDate: ['', Validators.compose([Validators.required])],
      gender: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    const user = this.form.value;
    user.account = new Account(this.form.value.username, this.form.value.password);
    user.role = new Role(this.form.value.role);
    this.authService.register(user).delay(1500).subscribe(resp => {
      this.authService.setConnectedUser(resp);
      this.router.navigate(['/']);
      this.toastr.success('Registered successfully');
    }, error => {
      this.submitted = false;
      this.toastr.error('Error while registering');
    });
  }

}
