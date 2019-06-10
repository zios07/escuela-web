import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { PanierService } from 'src/app/services/panier.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  courses: [];
  totalPrice = 0;

  constructor(private courseService: CoursService, private auth: AuthenticationService, private panierService: PanierService) { }

  ngOnInit() {
    this.loadPanierItems();
  }

  loadPanierItems() {
    if (this.auth.isAuthenticated()) {
      this.panierService.getPanierCourses().subscribe((resp: any) => {
        this.courses = resp.courses;
        this.calculatePanierPrice();
      })
    } else {
      this.panierService.getCachePanierCourses().then(resp => {
        this.courses = resp;
        this.calculatePanierPrice();
      })
    }
  }

  calculatePanierPrice() {
    this.courses.forEach((item: any) => {
      this.totalPrice += item.prix;
    })
  }

  removeFromPanier(course) {
    this.panierService.removeCourseFromPanier(course.id).subscribe((resp: any) => {
      this.courses = resp.courses;
      this.calculatePanierPrice();
    }, error => {

    });
  }



}
