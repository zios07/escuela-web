import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

const BASE_URL = environment.API_URL;
const API_ENFANT_URL = BASE_URL + '/eleves/';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  constructor(private http: HttpClient) { }

  addEnfant(user: User, mode: string) {
    if (mode === 'EDIT') {
      return this.http.put(API_ENFANT_URL, user);
    } else {
      return this.http.post(API_ENFANT_URL, user);
    }
  }

  getEnfants() {
    return this.http.get(API_ENFANT_URL);
  }

  deleteEnfant(id) {
    return this.http.delete(API_ENFANT_URL + id);
  }

  getMyEnfants(parentID?: number) {
    if (parentID) {
      return this.http.get(API_ENFANT_URL + 'parent/' + parentID);
    } else {
      return this.http.get(API_ENFANT_URL + 'parent/' + -1);
    }
  }

}
