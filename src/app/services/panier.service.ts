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


  async addCourseToPanier(course) {
    if (this.auth.isAuthenticated()) {
      return this.http.put(API_PANIER_URL, course);
    } else {
      return this.addCourseToCachePanier(course);
    }
  }

  async getPanierCourses() {
    if (this.auth.isAuthenticated()) {
      return this.http.get(API_PANIER_URL);
    } else {
      return this.getCachePanierCourses();
    }
  }

  private async getCachePanierCourses() {
    const panierCache = await localStorage.getItem('panier');
    if (panierCache) {
      return JSON.parse(panierCache);
    }
    return [];
  }

  private async addCourseToCachePanier(course) {
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
