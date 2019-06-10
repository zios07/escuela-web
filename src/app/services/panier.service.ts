import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

const BASE_URL = environment.API_URL;
const API_PANIER_URL = BASE_URL + '/paniers';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService) { }


  addCourseToPanier(course) {
    return this.http.post(API_PANIER_URL, course);
  }

  getPanierCourses() {
    return this.http.get(API_PANIER_URL);
  }

  removeCourseFromPanier(courseID) {

    if (this.auth.isAuthenticated()) {
      return this.http.delete(API_PANIER_URL + '/delete/course/' + courseID);
    } else {
      const updatedCourses = this.getPanierCourses().subscribe((resp: any) => {
        resp.courses.filter(element => element.id !== courseID);
        this.clearPanier();
        this.addCourseToPanier(updatedCourses);
      })
    }
  }

  clearPanier() {
    localStorage.removeItem('panier');
  }

  async getCachePanierCourses() {
    const panierCache = await localStorage.getItem('panier');
    if (panierCache) {
      const panier = JSON.parse(panierCache);
      if (panier) {
        return panier.courses;
      }
    }
    return [];
  }

  async addCourseToCachePanier(course) {
    let panier;
    let courses;
    const panierCache = await localStorage.getItem('panier');
    if (panierCache) {
      panier = JSON.parse(panierCache);
      courses = panier.courses;
    } else {
      panier = {};
      courses = [];
    }
    course.addedToCart = true;
    courses.push(course);
    panier.courses = courses;
    localStorage.setItem('panier', JSON.stringify(panier));
  }

}
