import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';
import { PanierService } from 'src/app/services/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  courses: [];

  constructor(private courseService: CoursService, private panierService: PanierService) { }

  ngOnInit() {
    this.loadPanierItems();
  }

  loadPanierItems() {
    this.panierService.getPanierCourses().then(resp => {
      this.courses = resp.courses;
    })
  }

}
