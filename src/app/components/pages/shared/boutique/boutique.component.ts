import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-boutique',
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {

  courses: [];
  constructor(private courseService: CoursService, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses().subscribe((resp: any) => {
      this.courses = resp;
    }, error => {
      this.toastr.error(JSON.stringify(error));
    })
  }

}
