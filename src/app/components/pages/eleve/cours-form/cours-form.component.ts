import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from 'src/app/models/Account';
import { CoursService } from 'src/app/services/cours.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../models/User';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.scss']
})
export class CoursFormComponent implements OnInit {

  title = 'Formulaire cours';
  form: FormGroup;
  submitted = false;
  mode = 'ADD';
  courseID;

  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private courseService: CoursService,
    private toastr: ToastrService
  ) {
    // check if we're in edit mode
    this.loadCoursToEdit();

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nom: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(120)])],
      prix: ['', Validators.compose([Validators.required])],
      niveau: ['', Validators.compose([Validators.required])],
      nbVisiteurs: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    const course = this.form.value;
    if (this.mode === 'ADD') {
      course.nbVisiteurs = 0;
    } else {
      course.id = this.courseID;
    }
    this.courseService.save(course, this.mode).delay(1000).subscribe(resp => {
      this.toastr.success('Cours enregistré avec succès');
      this.submitted = false;
    }, error => {
      this.submitted = false;
      const message = error.error ? error.error.message ? error.error.message : 'Error occured' : 'Error occured';
      this.toastr.error(message);
    });
  }

  loadCoursToEdit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mode = 'EDIT';
      this.courseID = id;
      this.courseService.findById(id).subscribe((result: Course) => {
        this.fillForm(result);
      }, error => {
        this.toastr.error(String(error));
      });
    }
  }

  fillForm(course) {
    if (course) {
      this.form.get('nom').setValue(course.nom);
      this.form.get('description').setValue(course.description);
      this.form.get('prix').setValue(course.prix);
      this.form.get('niveau').setValue(course.niveau);
      this.form.get('nbVisiteurs').setValue(course.nbVisiteurs);
    }
  }

}
