import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/services/cours.service';
import { PageEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

  courses: [];
  length;
  form: FormGroup;

  size = 10;
  page = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private formBuilder: FormBuilder, private courseService: CoursService, private toastr: ToastrService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      searchKeyWord: [''],
    });
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses(this.page, this.size).subscribe((resp: any) => {
      this.courses = resp.content;
      this.length = resp.totalElements;
    }, error => {
      this.toastr.error(JSON.stringify(error));
    })
  }

  pageChanged(event) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    if (this.form.value.searchKeyWord) {
      this.searchCourses();
    } else {
      this.loadCourses();
    }
    return event;
  }

  clear() {
    this.form.reset();
    this.loadCourses();
  }

  searchCourses() {
    this.courseService.searchCourses(this.page, this.size, this.form.value.searchKeyWord).subscribe((resp: any) => {
      this.courses = resp.content;
      this.length = resp.totalElements;
    }, error => {
      this.toastr.error(JSON.stringify(error));
    })
  }

}
