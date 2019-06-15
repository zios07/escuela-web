import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const BASE_URL = environment.API_URL;
const API_COURS_URL = BASE_URL + '/courses';

@Injectable({
  providedIn: 'root'
})
export class CoursService {

  constructor(
    private http: HttpClient
  ) { }

  updateCourse(course) {
    return this.http.put(API_COURS_URL, course);
  }

  getCourses(page?, size?) {
    return this.http.get(API_COURS_URL + '?page=' + page + '&size=' + size);
  }

  getAllCourses() {
    return this.http.get(API_COURS_URL + '/all');
  }

  searchCourses(page, size, keyword) {
    return this.http.get(API_COURS_URL + '/search?page=' + page + '&size=' + size + '&keyword=' + keyword);
  }

  delete(id) {
    return this.http.delete(API_COURS_URL + '/' + id);
  }

  save(course, mode) {
    if (mode === 'EDIT') {
      return this.http.put(API_COURS_URL, course);
    } else {
      return this.http.post(API_COURS_URL, course);
    }
  }

  findById(id) {
    return this.http.get(API_COURS_URL + '/' + id);
  }

}
