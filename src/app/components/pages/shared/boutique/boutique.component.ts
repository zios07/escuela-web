import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/services/cours.service';
import { PanierService } from 'src/app/services/panier.service';
import { ArrayDataSource } from '@angular/cdk/collections';

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

  constructor(private formBuilder: FormBuilder, private courseService: CoursService, private toastr: ToastrService, private panierService: PanierService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      searchKeyWord: [''],
    });
    this.loadCourses();
  }

  addToCart(course) {
    this.panierService.addCourseToPanier(course).then(resp => {
      course.inPanier = true;
      this.toastr.info('Le cours est maintenant dans votre panier !');
    });
  }

  loadCourses() {
    this.courseService.getCourses(this.page, this.size).subscribe((resp: any) => {
      this.courses = resp.content;
      this.length = resp.totalElements;
      this.checkPanierCourses();
    }, error => {
      this.toastr.error(JSON.stringify(error));
    });
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
    });
  }

  checkPanierCourses() {
    this.panierService.getPanierCourses().then(resp => {
      if (resp && resp.courses && resp.courses.length > 0) {
        resp.courses.forEach(element => {
          this.courses.forEach((course: any) => {
            if (course.id === element.id) {
              course.inPanier = true;
            }
          });
        });
      }
    })
  }


}
