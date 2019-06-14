import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

const BASE_URL = environment.API_URL;
const API_ENFANT_URL = BASE_URL + '/users/new/enfant';

@Injectable({
  providedIn: 'root'
})
export class EnfantService {

  constructor(private http: HttpClient) { }

  addEnfant(user: User) {
    return this.http.post(API_ENFANT_URL, user);
  }

}
