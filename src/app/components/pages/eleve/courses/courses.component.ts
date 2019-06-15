import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CoursService } from 'src/app/services/cours.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: [];
  totalPrice = 0;

  constructor(private courseService: CoursService, private router: Router, private auth: AuthenticationService, private panierService: PanierService) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.auth.getConnectedUser().then(resp => {
      const connectedUser = resp;
      if (connectedUser.parent && connectedUser.parent.panier && connectedUser.parent.panier.courses) {
        this.courses = connectedUser.parent.panier.courses;
      } else {
        this.courses = [];
      }
    });
  }

  viewCourse(course) {
    this.router.navigate(['/course/', course.id]);
  }

}
